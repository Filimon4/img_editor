import { cn } from '@/lib/utils'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaArrowsSpin, FaPlus } from 'react-icons/fa6'
import { Button } from '../ui/button'
import { GiCardExchange } from 'react-icons/gi'
import { RiDeleteBin2Fill, RiEditFill } from 'react-icons/ri'
import { FiAlertTriangle } from 'react-icons/fi'
import { FileContext } from '@/lib/fileContext'
import { EditContext } from '@/lib/editContext'

const Uploader = () => {
  const fileUploaderRef = useRef(null)
  const {file, setFile} = useContext(FileContext)
  const {edit, setEdit} = useContext(EditContext)
  const [isDragging, setIsDraging] = useState(false)
  const [isImgLoading, setIsImgLoading] = useState(true)
  const [error, setError] = useState(false)

  const onUploaderClick = (e) => {
    e.preventDefault()
    fileUploaderRef.current?.click()
    const files = e.target.files 
    if (!files) return
  }

  const uplodedImgsChanges = (e) => {
    if (fileUploaderRef.current?.files.length > 0) {
      const file = fileUploaderRef.current?.files[0]
      setFile(file)
      if (file.size > 5000000) {
        setError(true)
        return
      }
      setError(false)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDraging(false)
    const file = e.dataTransfer.files[0]
    setFile(file)
    if (file.size > 5000000) {
      setError(true)
      return
    }
    setError(false)
    setIsImgLoading(true)
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDraging(true)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDraging(false)
  }

  const onDeleteFile = (e) => {
    e.preventDefault()
    setFile(null)
    setIsImgLoading(true)
  }

  const onSwitchFile = async (e) => {
    e.preventDefault()
    //@ts-ignore
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    })
    if (!fileHandle) return
    setFile(null)
    const file = await fileHandle.getFile()
    if (file) {
      setFile(file)
      if (file.size > 5000000) {
        setError(true)
        return
      }
      setError(false)
      setIsImgLoading(true)
    }
  }

  return (
    <div 
      className='h-full w-full flex justify-center items-center'
      onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
    >
      <div className={
        cn(
          'h-[528px] w-[1076px] bg-slate-50 rounded-md border-dashed border-2 flex justify-center items-center relative',
          {'bg-slate-300 border-blue-300': isDragging}
        )
      }>
        {!file && !error && <>
          <div className='h-full w-full absolute top-0 left-0 cursor-pointer z-30' onClick={e => onUploaderClick(e)}></div>
        </>}
        {file ? <>
          <div className='flex flex-col justify-center items-center relative w-full h-full'>
            {!error && isImgLoading && <>
              <div className='absolute top-[0] left-[0] w-full h-full bg-transparent flex justify-center items-center flex-col gap-4'>
                <span className="loader"></span>
                <p className='text-blue-400'>File name {file.name}</p>
              </div>
            </>}
            {!error && !isImgLoading && <>
              <div className='absolute top-[-50px] left-[0] w-[170px] h-[40px]  bg-slate-50 rounded shadow-lg'>
                <div className='w-full h-full flex justify-around items-center'>
                  <p>Image</p>
                  <Button variant='ghost' className='w-[30px] h-[30px] p-0' onClick={onSwitchFile}>
                    <GiCardExchange size={20} className='size-[20px]' height={20} width={20} />
                  </Button>
                  <Button variant='ghost' className='w-[30px] h-[30px] p-0' onClick={e => setEdit(true)}>
                    <RiEditFill size={20} className='size-[20px]' height={20} width={20} />
                  </Button>
                  <Button variant='ghost' className='w-[30px] h-[30px] p-0' onClick={onDeleteFile}>
                    <RiDeleteBin2Fill size={20} className='size-[20px] text-red-500' height={20} width={20} />
                  </Button>
                </div>
              </div>
            </>}
            {error && <>
              <div className='flex justify-center items-center flex-col gap-3'>
                <p className='text-red-500 flex justify-center items-center gap-2'>
                  <FiAlertTriangle className='text-red-500 size-[20px]' />
                  File size too large
                </p>
                <p className=''>File name {file.name}</p>
                <Button variant='outline' onClick={onSwitchFile}>
                  Try again
                </Button>
              </div>
            </>}
            {!error && <>
              <img className='object-cover max-h-[528px] max-w-[1076px] w-auto h-auto z-40' src={URL.createObjectURL(file)} alt="img" onLoad={e => setIsImgLoading(false)} />
            </>}
          </div>
        </> : <>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center items-center relative'  >
              <input onChange={uplodedImgsChanges} ref={fileUploaderRef} type='file' accept='image/png, image/jpeg, image/jpg' className='hidden' />
              <span className={cn('w-[190%] h-[190%] absolute bg-slate-200 rounded-full z-10', {'bg-sky-400': isDragging})}></span>
              <FaPlus className={cn('w-[26px] h-[26px] z-20', {'text-white': isDragging})}/>
            </div>
            <div className='pt-5 k flex flex-col justify-center items-center '>
              <p className='text-black' >Drop file to upload</p>
              <p className='text-black' >or select file</p>
              <p className='text-gray-500'>5 MB Max, JPEG, PNG, GIF, SVG</p>
            </div>
          </div>
        </>}
      </div>
    </div>
  )
}

export default Uploader