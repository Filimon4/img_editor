import React from "react";
import { Image } from 'react-konva';

export interface IFIleProps {
  file: File;
  x: number;
  y: number
}

class FileImage extends React.Component<IFIleProps> {
  state = {
    image: null
  };
  image = null

  constructor (props: IFIleProps) {
    super(props)

    this.state = {
      image: null
    }
    this.image = null
  }

  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    this.loadImage();
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = URL.createObjectURL(this.props.file)
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
      />
    );
  }
}

export default FileImage