import { Events, TImageAdjust } from "@/lib/config";
import Konva from "konva";
import React, { RefObject } from "react";
import { Image } from 'react-konva';
import EventEmitter from "reactjs-eventemitter";

export interface IFIleProps {
  file: File;
  x: number;
  y: number;
  refImage: React.MutableRefObject<any>;
  canvasWidth: number;
  canvasHeight: number;
}

export interface IFIleState {
  image: HTMLImageElement,
  crop: TImageAdjust['crop'],
  resize: TImageAdjust['resize'],
  rotate: TImageAdjust['rotate'],
  adjust: TImageAdjust['adjust'],
  filter: TImageAdjust['filter']
}

class FileImage extends React.Component<IFIleProps, IFIleState> {
  imgAspectRation: number = null
  imgActualWidth: number = null
  imgActualHeight: number = null
  img: HTMLImageElement;

  constructor (props: IFIleProps) {
    super(props)

    this.state = {
      image: null,
      crop: {
        ratio: "None",
        x: 0,
        y: 0,
        width: this.props.canvasWidth,
        height: this.props.canvasHeight
      },
      resize: {
        width: 0,
        height: 0,
        aspect: false
      },
      rotate: {
        deg: 0,
        flip: {
          hor: false,
          ver: false
        }
      },
      adjust: {
        brightenes: 0,
        contrast: 0,
        saturation: 0,
        exposition: 0
      },
      filter: {
        type: "None"
      },
    }
  }

  componentDidMount() {
    this.loadImage();

    EventEmitter.subscribe(Events.applyAdjust, (data: TImageAdjust['adjust']) => {
      console.log(data)
      this.setState({
        ...this.state,
        adjust: data
      })
    })
    EventEmitter.subscribe(Events.applyFilters, (data: TImageAdjust['filter']) => {
      this.setState({
        ...this.state,
        filter: data
      })
    })
    EventEmitter.subscribe(Events.applyResize, (data: TImageAdjust['resize']) => {
      const {} = this.state
      this.setState({
        ...this.state,
        resize: {
          aspect: data.aspect,
          height: Number(data.height),
          width: Number(data.width),
        }
      })
    })
    EventEmitter.subscribe(Events.applyRotate, (data: TImageAdjust['rotate']) => {
      console.log(data)
      this.setState({
        ...this.state,
        rotate: data
      })
    })
    EventEmitter.subscribe(Events.applyCrop, (data: TImageAdjust['crop']) => {
      this.cropImg(data)
    })


  }

  componentWillUnmount() {
  }
  
  componentDidUpdate(prevProps, prevState, snapShot) {
    this.resizeImg()
    this.setRotate()
    this.setFilters()
  }
  shouldComponentUpdate(nextProps: Readonly<IFIleProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    return true
  }

  loadImage() {
    this.img = new window.Image();
    this.img.src = URL.createObjectURL(this.props.file)
    this.img.onload = () => {
      this.imgActualHeight = this.img.height
      this.imgActualWidth = this.img.width
      this.imgAspectRation = this.imgActualWidth / this.imgActualHeight
      let imgHeight = 0
      let imgWidth = 0
      
      if (this.props.canvasHeight < this.props.canvasWidth) {
        imgHeight = this.props.canvasHeight
        imgWidth = this.props.canvasHeight * this.imgAspectRation
      } else {
        imgWidth = this.props.canvasWidth
        imgHeight = this.props.canvasWidth / this.imgAspectRation
      }
      
      this.setState({
        ...this.state,
        image: this.img,
        resize: {
          aspect: true,
          height: imgHeight,
          width: imgWidth
        },
        crop: {
          ratio: "None",
          height: 0,
          width: 0,
          x: 0,
          y: 0
        }
      });
    }
  }

  resizeImg = () => {
      const minusX = this.state.crop.x
      const minusY = this.state.crop.y
      const minusWidth = this.state.crop.width
      const minusHeight = this.state.crop.height

      this.props.refImage.current.size({
        width: this.state.resize.width - (minusWidth / (this.imgActualWidth / this.state.resize.width)),
        height: this.state.resize.height - (minusHeight / (this.imgActualWidth / this.state.resize.width))
      })
      this.props.refImage.current.crop({
        x: minusX,
        y: minusY,
        width: this.imgActualWidth - minusWidth,
        height: this.imgActualHeight - minusHeight
      })
      this.props.refImage.current.position({
        y: 0,
        x: 0
      })
  }

  setFilters = () => {
    const image = this.props.refImage.current
    if (image) {
      if (image.size().width <= 0 || image.size().height <= 0) return
      const {brightenes, contrast, exposition, saturation} = this.state.adjust
      image.cache();
      image.filters([Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSL, Konva.Filters.HSV]);
      image.brightness(brightenes/100);
      image.contrast(contrast);
      image.luminance(exposition/100);
      image.saturation(saturation/100)
      if (this.state.filter.type == 'Sepia') {
        image.filters([Konva.Filters.Sepia]);
      } else if (this.state.filter.type == 'Black&White') {
        image.luminance(0)
        image.brightness(0);
        image.contrast(0);
        image.saturation(-1)
      }
    }
  }

  setRotate = () => {
    this.props.refImage.current.rotation(this.state.rotate.deg)
    let offsetX = 0
    let offsetY = 0
    if (!this.state.rotate.flip.hor) {
      this.props.refImage.current.scale({
        x: 1,
        y: this.props.refImage.current.scale().y
      })
    } else {
      this.props.refImage.current.scale({
        x: -1,
        y: this.props.refImage.current.scale().y
      })
      offsetX += this.props.refImage.current.size().width
    }
    if (!this.state.rotate.flip.ver) {
      this.props.refImage.current.scale({
        x: this.props.refImage.current.scale().x,
        y: 1
      })
    } else {
      this.props.refImage.current.scale({
        x: this.props.refImage.current.scale().x,
        y: -1
      })
      offsetY += this.props.refImage.current.size().height
    }
    this.props.refImage.current.rotation(this.state.rotate.deg)
    if (this.state.rotate.deg <= 0) {
      if (Math.abs(this.state.rotate.deg) % 360 == 90) {
        offsetX += this.props.refImage.current.size().width * this.props.refImage.current.scale().x
      }
      if (Math.abs(this.state.rotate.deg) % 360 == 180) {
        offsetX += this.props.refImage.current.size().width * this.props.refImage.current.scale().x
        offsetY += this.props.refImage.current.size().height * this.props.refImage.current.scale().y
      }
      if (Math.abs(this.state.rotate.deg) % 360 == 270) {
        offsetY += this.props.refImage.current.size().height * this.props.refImage.current.scale().y
      }
    } else {
      if (Math.abs(this.state.rotate.deg) % 360 == 90) {
        offsetX += this.props.refImage.current.size().width * this.props.refImage.current.scale().x
        offsetY += this.props.refImage.current.size().height * this.props.refImage.current.scale().y
        offsetX -= this.props.refImage.current.size().width * this.props.refImage.current.scale().x
      }
      if (Math.abs(this.state.rotate.deg) % 360 == 180) {
        offsetX += this.props.refImage.current.size().width * this.props.refImage.current.scale().x
        offsetY += this.props.refImage.current.size().height * this.props.refImage.current.scale().y
      }
      if (Math.abs(this.state.rotate.deg) % 360 == 270) {
        offsetY += this.props.refImage.current.size().height * this.props.refImage.current.scale().y
        offsetY -= this.props.refImage.current.size().height * this.props.refImage.current.scale().y
        offsetX += this.props.refImage.current.size().width * this.props.refImage.current.scale().x
      }
      console.log(offsetX, offsetY, Math.abs(this.state.rotate.deg) % 360, this.props.refImage.current.scale().x)
    }
    this.props.refImage.current.offsetX(offsetX)
    this.props.refImage.current.offsetY(offsetY)
  }

  cropImg(data)  {
    if (!data) return
    this.setState({
      ...this.state,
      crop: {
        ratio: 'None',
        height: this.state.resize.height - data.height,
        width: this.state.resize.width - data.width,
        x: data.x,
        y: data.y
      }
    })
  }

  render() {
    return (
      <Image
        x={0}
        y={0}
        image={this.state.image}
        ref={this.props.refImage}
      />
    );
  }
}

export default FileImage