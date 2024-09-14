import { TImageAdjust } from "@/lib/config";
import Konva from "konva";
import React, { RefObject } from "react";
import { Image } from 'react-konva';

export interface IFIleProps {
  file: File;
  x: number;
  y: number;
  refImage: React.MutableRefObject<any>;
  adjust: TImageAdjust 
}


class FileImage extends React.Component<IFIleProps> {
  state = {
    image: null,
  };
  image = null
  aspectRation: number = null
  scale = 0.85

  constructor (props: IFIleProps) {
    super(props)

    this.state = {
      image: null,
    }
    this.image = null
  }

  componentDidMount() {
    this.loadImage();
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  
  componentDidUpdate(prevProps, prevState, snapShot) {
    // this.setRotate()
    this.resizeImg()
    this.setFilters()
  }
  shouldComponentUpdate(nextProps: Readonly<IFIleProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    //@ts-ignore
    return true
  }

  loadImage() {
    this.image = new window.Image();
    this.image.src = URL.createObjectURL(this.props.file)
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    this.setState({
      image: this.image,
    });

    this.resizeImg()
    
  };
  resizeImg = () => {
    if (this.props.refImage.current && this.props.refImage.current.width() ) {
      if (this.aspectRation == null) {
        this.aspectRation = this.props.refImage.current.width() / this.props.refImage.current.height() 
      }
      const {width: parentWidth, height: parentHeight} = this.props.refImage.current.parent.parent.attrs
      const parentRation = parentWidth / parentHeight
      
      let imgWidth = null
      let imgHeight = null
      let x = null
      let y = null
      if (this.aspectRation > 1) {
        imgWidth = parentWidth * this.scale
        imgHeight = parentWidth / this.aspectRation * this.scale
      } else if (this.aspectRation == 1) {
        const minDem = Math.min(parentHeight, parentWidth)
        imgWidth = minDem * this.scale
        imgHeight = minDem * this.scale
      } else {
        imgWidth = parentHeight * this.scale
        imgHeight = parentWidth * this.aspectRation * this.scale
      }
      console.log(Math.abs(this.props.adjust.rotate.deg) % 360)
      x = (parentWidth - imgWidth) / 2
      y = (parentHeight - imgHeight) / 2
      if (Math.abs(this.props.adjust.rotate.deg) % 360 == 90) {
        x = x + (parentWidth - imgHeight) / 2
        y = y + (parentHeight + imgHeight) / 2
        imgWidth = parentHeight 
        imgHeight = parentHeight / this.aspectRation
      }
      if (Math.abs(this.props.adjust.rotate.deg) % 360 == 180) {
        x = (x + imgWidth)
        y = (y + imgHeight)
      }
      if (Math.abs(this.props.adjust.rotate.deg) % 360 == 270) {
        x = (parentWidth + imgHeight) / 2 - x
        y = 0
        imgWidth = parentHeight
        imgHeight = parentHeight / this.aspectRation
      }
      this.props.refImage.current.size({
        width: imgWidth,
        height: imgHeight
      })
      if (this.props.refImage.current.scale().x == -1) {
        x = x + imgWidth
      }
      if (this.props.refImage.current.scale().y == -1) {
        y = y + imgHeight
      }
      this.props.refImage.current.position({
        x,
        y
      })
    }
  }
  setFilters = () => {
    const image = this.props.refImage.current
    if (image) {
      const {brightenes, contrast, exposition, saturation} = this.props.adjust.abjust
      image.cache();
      image.filters([Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSL, Konva.Filters.HSV]);
      image.brightness(brightenes/100);
      image.contrast(contrast);
      image.value(exposition/100);
      image.luminance(saturation/100)
    }
  }

  setRotate = () => {
    console.log('rotate')
    console.log(this.props.refImage.current.scale())
    this.props.refImage.current.rotation(this.props.adjust.rotate.deg)
    if (this.props.adjust.rotate.flip.hor) {
      this.props.refImage.current.scale({
        x: 1,
        y: this.props.refImage.current.scale().y
      })
    } else {
      this.props.refImage.current.scale({
        x: -1,
        y: this.props.refImage.current.scale().y
      })
    }
    if (this.props.adjust.rotate.flip.ver) {
      this.props.refImage.current.scale({
        x: this.props.refImage.current.scale().x,
        y: 1
      })
    } else {
      this.props.refImage.current.scale({
        x: this.props.refImage.current.scale().x,
        y: -1
      })

    }
  }

  setCrop = () => {
    this.props.refImage.current.crop({
      x: 0,
      y: 0,
      width: this.state.image.width,
      height:this.state.image.height
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