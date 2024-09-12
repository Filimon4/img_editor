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
    this.resizeImg()
    this.setFilters()
  }
  shouldComponentUpdate(nextProps: Readonly<IFIleProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    //@ts-ignore
    
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      return true
    }
    return false
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
    if (this.props.refImage.current && this.props.refImage.current.width() && this.props.refImage.current.height() ) {
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
      x = (parentWidth - imgWidth) / 2
      y = (parentHeight - imgHeight) / 2
      this.props.refImage.current.size({
        width: imgWidth,
        height: imgHeight
      })
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
      console.log(brightenes, contrast, exposition, saturation)
      image.cache();
      image.filters([Konva.Filters.Brighten, Konva.Filters.Contrast, Konva.Filters.HSL, Konva.Filters.HSV]);
      image.brightness(brightenes/100);
      image.contrast(contrast);
      image.value(exposition/100);
      image.luminance(saturation/100)
    }
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