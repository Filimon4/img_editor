import { EElemTypes, Events, TCreateElem, TImageAdjust } from '@/lib/config';
import React, { Component } from 'react'
import { Circle, Group, Layer, Line, Rect, Text } from 'react-konva';
import EventEmitter from "reactjs-eventemitter";

interface IFiguresProps {
  setAdjust: React.Dispatch<React.SetStateAction<TImageAdjust>>,
  adjust: TImageAdjust,
}

interface IFiguresState {
  refGroup: any;
  selectedElement: any;
}

export default class FiguresImage extends Component<IFiguresProps, IFiguresState> {
  
  constructor(props) {
    super(props)

    this.state = {
      refGroup: null,
      selectedElement: null
    }
  }

  shouldComponentUpdate(nextProps: Readonly<IFiguresProps>, nextState: Readonly<IFiguresState>, nextContext: any): boolean {
    return true
    // if (JSON.stringify(nextState) !== JSON.stringify(this.state) || JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      // return true
    // }
    // return false
  }

  componentDidMount(): void {
    this.state.refGroup.addEventListener('click', (e) => {
      const clickX = e.layerX
      const clickY = e.layerY
      const elem = this.state.refGroup.children.find(obj => {
        const attrs = obj.attrs
        const className = obj.__proto__.className
        
        // console.log(obj.attrs.x, clickX, obj.attrs.y, clickY)
      })
      console.log(elem)
    })
  }

  componentDidUpdate(prevProps: Readonly<IFiguresProps>, prevState: Readonly<IFiguresState>, snapshot?: any): void {
  }
  
  // makeElem(data: TCreateElem) {
  //   if (data.type == EElemTypes.text){
  //     newElem = {
  //       type: EElemTypes.text,
  //       x: 0,
  //       y: 0,
  //       text: 'hello',
  //       fontSize: 15,
  //       fontFamily: "Arial",
  //       fill: "black",
  //     }
  //   }

  //   console.log(this.props.adjust)
  //   const newElements = this.props.adjust.elements
  //   newElements.push(newElem)
    
  //   this.props.setAdjust({
  //     ...this.props.adjust,
  //     elements: newElements
  //   })
  // }

  selectElem(obj, elem) {
    this.setState({
      ...this.state,
      selectedElement: elem
    })
    EventEmitter.emit(Events.changeSettings, {name: obj.type})
  }

  render() {
    // console.log(this.props.adjust)
    return (
      <Group ref={(node) => this.state.refGroup = node}>
        {this.props.adjust && this.props.adjust.elements.map((obj) => {
          if (obj.type == EElemTypes.text) {
            return (
              <Text
                draggable
                x={obj.x}
                y={obj.y}
                text={obj.text}
                fontSize={obj.fontSize}
                fontFamily={obj.fontFamily}
                fill={obj.fill}
              />
            )
          }
          if (obj.type == EElemTypes.rect) {
            return (
              <Rect
                draggable
                x={obj.x}
                y={obj.y}
                width={obj.width}
                height={obj.height}
                fill={obj.fill}
              />
            )
          }
          if (obj.type == EElemTypes.circle) {
            return (
              <Circle
                draggable
                x={obj.x}
                y={obj.y}
                width={obj.width}
                height={obj.height}
                fill={obj.fill}
                radius={obj.radius}
              />
            )
          }
          if (obj.type == EElemTypes.line) {
            return (
              <Line
                draggable
                x={obj.x}
                y={obj.y}
                stroke={obj.stroke}
                strokeWidth={obj.strokeWidth}
                points={obj.points}
              />
            )
          }
        })}
      </Group>
    )
  }
}
