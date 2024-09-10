import { FileContext } from '@/lib/fileContext'
import { cn } from '@/lib/utils'
import React, { useContext, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'

const Uploader = () => {
  const fileUploaderRef = useRef(null)
  const {file, setFile} = useContext(FileContext)
  const [isDragging, setIsDraging] = useState(false)

  const onUploaderClick = (e) => {
    e.preventDefault()
    fileUploaderRef.current?.click()
    const files = e.target.files 
    if (!files) return
    console.log(files)
  }

  const uplodedImgsChanges = (e) => {
    if (fileUploaderRef.current?.files.length > 0) {
      setFile(fileUploaderRef.current?.files[0])
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDraging(false)
    const file = e.dataTransfer.files[0]
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDraging(true)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDraging(false)
  }

  return (
    <div 
      className='h-full w-full flex justify-center items-center'
      onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
    >
      <div className='h-full w-full absolute top-0 left-0 cursor-pointer z-30' onClick={e => onUploaderClick(e)}></div>
      <div className={
        cn(
          'h-[528px] w-[1076px] bg-slate-50 rounded-md border-dashed border-2 flex justify-center items-center',
          {'bg-slate-300 border-blue-300': isDragging}
        )
      }>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center relative'  >
            <input onChange={uplodedImgsChanges} ref={fileUploaderRef} type='file' accept='image/png, image/jpeg' className='hidden' />
            <span className={cn('w-[190%] h-[190%] absolute bg-slate-200 rounded-full z-10', {'bg-sky-400': isDragging})}></span>
            <FaPlus className={cn('w-[26px] h-[26px] z-20', {'text-white': isDragging})}/>
          </div>
          <div className='pt-5 k flex flex-col justify-center items-center '>
            <p className='text-black' >Drop file to upload</p>
            <p className='text-black' >or select file</p>
            <p className='text-gray-500'>5 MB Max, JPEG, PNG, GIF, SVG</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Uploader