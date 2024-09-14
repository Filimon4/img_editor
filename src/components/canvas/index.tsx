import { FileContext } from '@/lib/fileContext';
import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { Stage, Layer, Text, Image, Rect } from 'react-konva';
import FileImage from './FileImage';
import { ESettingsMenu } from '@/lib/config';
import CropImage from './CropImage';
import ResizeImage from './ResizeImage';
import Konva from 'konva';
import { ImageAdjustContext } from '@/lib/imageAdjustContext';

const CanvasEditor = memo(({editType}: {editType: ESettingsMenu}) => {
  const {file} = useContext(FileContext);
  const {adjust, setAdjust} = useContext(ImageAdjustContext)
  const refImage = useRef<Konva.Image>(null)
  const refCanvas = useRef(null)
  const refLink = useRef<HTMLLinkElement>(null)

  const download = (e) => {
    refImage.current.toImage({quality: 1, mimeType: "image/png", callback(img) {
      refLink.current.appendChild(img)
      refLink.current.setAttribute('href', img.getAttribute('src'))
      refLink.current.click()
    }});
  }

  return (
    <>
      <Stage ref={refCanvas} width={870} height={500} className='' >
        <Layer>
          <FileImage adjust={adjust} refImage={refImage} file={file} x={0} y={0}  />
          {editType == ESettingsMenu.crop && <>
            <CropImage setAdjust={setAdjust} adjust={adjust} refImage={refImage} />
          </>}
          {editType == ESettingsMenu.resize && <>
            <ResizeImage refImage={refImage}/>
          </>}
        </Layer>
      </Stage>
      {/* <button onClick={download}>C</button>
      <a className='hidden' ref={refLink as unknown as React.LegacyRef<HTMLAnchorElement>} download={'img.png'}>
      </a> */}
    </>
  )
})

export default CanvasEditor