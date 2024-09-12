import React, { Component } from 'react'
import { Circle, Rect } from 'react-konva'

export interface ICropProps {
  refImage: React.MutableRefObject<any>
}

export default class ResizeImage extends Component<ICropProps> {
  state = {
    x: 0,
    y: 0,
    topLeft: null,
    bottomLeft: null,
    topRight: null,
    bottonRight: null,
    rect: null
  }

  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      topLeft: null,
      bottomLeft: null,
      topRight: null,
      bottonRight: null,
      rect: null
    }
  }

  componentDidMount(): void {
    this.setCorners()
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

  updateTopLeft(): void {
    this.state.topLeft.position({
      x: this.props.refImage.current.getAttrs().x,
      y: this.props.refImage.current.getAttrs().y
    })
  }
  updateTopRight(): void {
    this.state.topRight.position({
      x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width,
      y: this.props.refImage.current.getAttrs().y
    })
  }
  updateBottomLeft(): void {
    this.state.bottomLeft.position({
      x: this.props.refImage.current.getAttrs().x,
      y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height
    })
  }
  updateBottomRight(): void {
    this.state.bottonRight.position({
      x: this.props.refImage.current.getAttrs().x+this.props.refImage.current.size().width,
      y: this.props.refImage.current.getAttrs().y+this.props.refImage.current.size().height
    })
  }
  updateRect(): void {
    this.state.rect.size({
      width: Math.abs(this.state.topLeft.getAttrs().x - this.state.topRight.getAttrs().x),
      height: Math.abs(this.state.topLeft.getAttrs().y - this.state.bottomLeft.getAttrs().y)
    })
    this.state.rect.position({
      y: this.state.topLeft.getAttrs().y,
      x: this.state.topLeft.getAttrs().x
    })
  }

  setCorners(): void {
    if (this.props.refImage.current && this.state.bottomLeft && this.state.bottonRight && this.state.topLeft && this.state.topRight) {
      this.updateBottomRight()
      this.updateBottomLeft()
      this.updateTopLeft()
      this.updateTopRight()
      this.updateRect()
    }
  }

  render() {
    return (
      <>
        <Rect ref={(node) => this.state.rect = node} x={this.state.x} y={this.state.y} fill={'transparent'} stroke={'#12A3F8'} strokeWidth={5} />
        <Circle ref={(node) => this.state.topLeft = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2}  />
        <Circle ref={(node) => this.state.topRight = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2} />
        <Circle ref={(node) => this.state.bottomLeft = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2} />
        <Circle ref={(node) => this.state.bottonRight = node} fill={'white'} radius={5} stroke={'#12A3F8'} strokeWidth={2} />
      </>
    )
  }
}
