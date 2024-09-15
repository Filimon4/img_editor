import { Events, TImageAdjust } from '@/lib/config';
import Konva from 'konva'
import React, { Component } from 'react'
import { Circle, Image, Rect } from 'react-konva'
import EventEmitter from "reactjs-eventemitter";

export interface ICropProps {
  refImage: React.MutableRefObject<any>,
  setAdjust: React.Dispatch<React.SetStateAction<TImageAdjust>>,
  adjust: TImageAdjust,
  refRect: React.MutableRefObject<any> 
}

export default class CropImage extends Component<ICropProps> {
  state = {
    x: 0,
    y: 0,
    topLeft: null,
    bottomLeft: null,
    topRight: null,
    bottomRight: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      topLeft: null,
      bottomLeft: null,
      topRight: null,
      bottomRight: null,
    }
  }

  componentDidMount(): void {
    this.setCorners()

    EventEmitter.subscribe(Events.setCrop, (data) => {
      EventEmitter.emit(Events.applyCrop, {
        width: this.props.refRect.current.size().width,
        height: this.props.refRect.current.size().height,
        x: this.props.refRect.current.position().x,
        y: this.props.refRect.current.position().y
      })
    })
  }

  componentDidUpdate(prevProps: Readonly<ICropProps>, prevState: Readonly<{}>, snapshot?: any): void {
    this.setCorners()
  } 

  componentWillUnmount(): void {
    this.setState({
      x: 0,
      y: 0,
      topLeft: null,
      bottomLeft: null,
      topRight: null,
      bottonRight: null,
      rect: null
    })
  }

  setTopLeft(): void {
    this.state.topLeft.position({
      x: this.props.refImage.current.getAttrs().x,
      y: this.props.refImage.current.getAttrs().y
    })
  }
  setTopRight(): void {
    this.state.topRight.position({
      x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width,
      y: this.props.refImage.current.getAttrs().y
    })
  }
  setBottomLeft(): void {
    this.state.bottomLeft.position({
      x: this.props.refImage.current.getAttrs().x,
      y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height
    })
  }
  setBottomRight(): void {
    this.state.bottomRight.position({
      x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width,
      y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height
    })
  }
  updateRect(): void {
    let imgWidht = Math.abs(this.state.topLeft.getAttrs().x - this.state.topRight.getAttrs().x)
    let imgHeight = Math.abs(this.state.topLeft.getAttrs().y - this.state.bottomLeft.getAttrs().y)
    if (this.props.adjust.crop.ratio !== "None") {
      let [width, height] = this.props.adjust.crop.ratio.split(':')
      if (Number(width) == Number(height)) {
        if (imgHeight > imgWidht) {
          imgHeight = imgWidht
        } else {
          imgWidht = imgHeight
        }
      } else {
        const OnePartWidth = imgWidht / Number(width)
        imgHeight = Number(height) * OnePartWidth 
      } 
    }
    this.props.refRect.current.size({
      width: imgWidht,
      height: imgHeight
    })
    this.props.refRect.current.position({
      y: this.state.topLeft.getAttrs().y,
      x: this.state.topLeft.getAttrs().x
    })
  }
  getRect() {
    return {  
      width: this.props.refRect.current.size().width,
      height: this.props.refRect.current.size().height,
      x: this.props.refRect.current.position().x,
      y: this.props.refRect.current.position().y
    }
    
  }

  setCorners(): void {
    if (this.props.refImage.current && this.state.bottomLeft && this.state.bottomRight && this.state.topLeft && this.state.topRight) {
      this.setBottomRight()
      this.setBottomLeft()
      this.setTopLeft()
      this.setTopRight()
      this.updateRect()
    }
  }

  checkBoundsTopLeft(): void {
    if (this.state.topLeft.getAttrs().x < this.props.refImage.current.getAttrs().x) {
      this.state.topLeft.position({
        y: this.state.topLeft.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x
      })
    }
    if (this.state.topLeft.getAttrs().x > this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width){
      this.state.topLeft.position({
        y: this.state.topLeft.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width
      })
    }
    if (this.state.topLeft.getAttrs().y < this.props.refImage.current.getAttrs().y){
      this.state.topLeft.position({
        y: this.props.refImage.current.getAttrs().y,
        x: this.state.topLeft.getAttrs().x
      })
    }
    if (this.state.topLeft.getAttrs().y > this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height){
      this.state.topLeft.position({
        y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height,
        x: this.state.topLeft.getAttrs().x
      })
    }
  }
  checkBoundsTopRight(): void {
    if (this.state.topRight.getAttrs().x < this.props.refImage.current.getAttrs().x) {
      this.state.topRight.position({
        y: this.state.topRight.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x
      })
    }
    if (this.state.topRight.getAttrs().x > this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width){
      this.state.topRight.position({
        y: this.state.topRight.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width
      })
    }
    if (this.state.topRight.getAttrs().y < this.props.refImage.current.getAttrs().y){
      this.state.topRight.position({
        y: this.props.refImage.current.getAttrs().y,
        x: this.state.topRight.getAttrs().x
      })
    }
    if (this.state.topRight.getAttrs().y > this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height){
      this.state.topRight.position({
        y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height,
        x: this.state.topRight.getAttrs().x
      })
    }
  }
  checkBoundsBottomLeft(): void {
    if (this.state.bottomLeft.getAttrs().x < this.props.refImage.current.getAttrs().x) {
      this.state.bottomLeft.position({
        y: this.state.bottomLeft.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x
      })
    }
    if (this.state.bottomLeft.getAttrs().x > this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width){
      this.state.bottomLeft.position({
        y: this.state.bottomLeft.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width
      })
    }
    if (this.state.bottomLeft.getAttrs().y < this.props.refImage.current.getAttrs().y){
      this.state.bottomLeft.position({
        y: this.props.refImage.current.getAttrs().y,
        x: this.state.bottomLeft.getAttrs().x
      })
    }
    if (this.state.bottomLeft.getAttrs().y > this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height){
      this.state.bottomLeft.position({
        y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height,
        x: this.state.bottomLeft.getAttrs().x
      })
    }
  }
  checkBoundsBottomRight(): void {
    if (this.state.bottomRight.getAttrs().x < this.props.refImage.current.getAttrs().x) {
      this.state.bottomRight.position({
        y: this.state.bottomRight.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x
      })
    }
    if (this.state.bottomRight.getAttrs().x > this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width){
      this.state.bottomRight.position({
        y: this.state.bottomRight.getAttrs().y,
        x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width
      })
    }
    if (this.state.bottomRight.getAttrs().y < this.props.refImage.current.getAttrs().y){
      this.state.bottomRight.position({
        y: this.props.refImage.current.getAttrs().y,
        x: this.state.bottomRight.getAttrs().x
      })
    }
    if (this.state.bottomRight.getAttrs().y > this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height){
      this.state.bottomRight.position({
        y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height,
        x: this.state.bottomRight.getAttrs().x
      })
    }
  }

  dragTopLeft(): void {
    this.checkBoundsTopLeft();
    this.state.topRight.position({
      y: this.state.topLeft.getAttrs().y,
      x: this.state.topRight.getAttrs().x
    })
    this.state.bottomLeft.position({
      y: this.state.bottomLeft.getAttrs().y,
      x: this.state.topLeft.getAttrs().x
    })
    this.state.bottomRight.position({
      y: this.state.bottomRight.getAttrs().y,
      x: this.state.topRight.getAttrs().x
    })
    this.updateRect()
  }
  dragTopRight(): void {
    this.checkBoundsTopRight();
    this.state.topLeft.position({
      y: this.state.topRight.getAttrs().y,
      x: this.state.topLeft.getAttrs().x
    })
    this.state.bottomRight.position({
      y: this.state.bottomRight.getAttrs().y,
      x: this.state.topRight.getAttrs().x
    })
    this.state.bottomLeft.position({
      y: this.state.bottomLeft.getAttrs().y,
      x: this.state.topLeft.getAttrs().x
    })
    this.updateRect()
  }
  dragBottomLeft(): void {
    this.checkBoundsBottomLeft();
    this.state.topLeft.position({
      y: this.state.topLeft.getAttrs().y,
      x: this.state.bottomLeft.getAttrs().x
    })
    this.state.bottomRight.position({
      y: this.state.topRight.getAttrs().y+this.props.refRect.current.size().height,
      x: this.state.topRight.getAttrs().x
    })
    this.updateRect()
  }
  dragBottomRight(): void {
    this.checkBoundsBottomRight();
    this.state.bottomLeft.position({
      y: this.state.bottomRight.getAttrs().y,
      x: this.state.topLeft.getAttrs().x
    })
    this.state.topRight.position({
      y: this.state.topRight.getAttrs().y,
      x: this.state.bottomRight.getAttrs().x
    })
    this.updateRect()
  }

  render() {
    return (
      <>
        <Rect ref={this.props.refRect} x={this.state.x} y={this.state.y} fill={'transparent'} stroke={'#12A3F8'} strokeWidth={5} />
        <Circle draggable ref={(node) => this.state.topLeft = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2}  onDragMove={e => this.dragTopLeft()} />
        <Circle draggable ref={(node) => this.state.topRight = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2} onDragMove={e => this.dragTopRight()} />
        <Circle draggable ref={(node) => this.state.bottomLeft = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2} onDragMove={e => this.dragBottomLeft()} />
        <Circle draggable ref={(node) => this.state.bottomRight = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2} onDragMove={e => this.dragBottomRight()} />
      </>
    )
  }
}
