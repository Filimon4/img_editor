import { FileContext } from '@/lib/fileContext';
import React, { memo, useContext } from 'react'
import { Stage, Layer, Text, Image } from 'react-konva';
import FileImage from './FileImage';

const CanvasEditor = memo(() => {
  const {file} = useContext(FileContext);

  return (
    <Stage width={900} height={530} >
      <Layer>
        <FileImage file={file} x={0} y={0} />
      </Layer>
    </Stage>
  )
})

export default CanvasEditor