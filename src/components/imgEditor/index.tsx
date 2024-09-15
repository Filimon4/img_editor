import { FileContext } from '@/lib/fileContext'
import { cn } from '@/lib/utils';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Button } from '../ui/button';
import { DefaultImageAdjust, dropdownNav, editorNav, EElemTypes, ERotaionTypes, ESettingsMenu, ESettingTypes, Events, settigsMenuConfig } from '@/lib/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { MdRotateLeft, MdRotateRight } from "react-icons/md";
import { LuFlipHorizontal, LuFlipVertical } from "react-icons/lu";
import { SliderRange } from '../ui/range-slider';
import Nav from './Nav';
import Settings from './Settings';
import { ImageAdjustContext } from '@/lib/imageAdjustContext';
import EventEmitter from "reactjs-eventemitter";
import CanvasEditor from '../canvas';
import { EditContext } from '@/lib/editContext';

const ImgEditor = () => {
  const {file} = useContext(FileContext);
  const {adjust, setAdjust} = useContext(ImageAdjustContext)
  const {edit, setEdit} = useContext(EditContext)
  
  const [settingMenu, setSettingMenu] = useState<ESettingsMenu | null>(null)

  if (!file) return <></>

  const addNewElement = (data) => {
    const newElements = adjust.elements
    newElements.push({
      type: data.type,
      ...data.data
    })
    setAdjust({
      ...adjust,
      elements: newElements
    })
  }

  useEffect(() => {
    setAdjust({
      ...adjust,
      resize: {
        aspect: true,
        height: 500,
        width: 870
      }
    })
    // EventEmitter.emit(Events.applyResize, {
    //   width: 870,
    //   height: 500,
    //   aspect: true
    // })
  }, [])

  useEffect(() => {
    EventEmitter.subscribe(Events.changeSettings, (data) => {
      if (!data.name) return
      setSettingMenu(data.name)
    })
  })

  const onClickToDefault = (e) => {
    EventEmitter.emit(Events.applyAdjust, DefaultImageAdjust.adjust)
    EventEmitter.emit(Events.applyFilters, DefaultImageAdjust.filter)
    EventEmitter.emit(Events.applyRotate, DefaultImageAdjust.rotate)
    setAdjust({
      ...adjust,
      adjust: DefaultImageAdjust.adjust,
      filter: DefaultImageAdjust.filter,
      rotate: DefaultImageAdjust.rotate
    })
  }

  return (
    <div className='w-[1296px] h-[634px] bg-white relative rounded-md flex flex-col'>
      <div className='flex justify-between items-center p-2 shadow-md'>
        <h1 className='text-xl font-semibold'>Image Editor</h1>
        <div className='flex justify-center items-center relative' onClick={e => setEdit(false)}>
          <span className={'w-[130%] h-[130%] absolute bg-slate-200 rounded-full z-10'}></span>
          <IoClose className={'w-[26px] h-[26px] z-20'} />
        </div>
      </div>
      <div className='relative h-full w-full flex justify-normal'>
        <div className='min-w-[196px] h-full flex flex-col shadow-md'>
          <Nav setSettingMenu={setSettingMenu} addNewElement={addNewElement} />
        </div>
        <div className='flex flex-col w-full h-full'>
          <div className='h-full w-full flex justify-center items-center p-4'>
            <CanvasEditor width={870} height={500} editType={settingMenu} />
          </div>
          <div className='h-[56px] w-full shadow-inner flex justify-between items-center pl-2 pr-2'>
            <Button variant='ghost' onClick={onClickToDefault}>Revert to Original</Button>
            <div className='flex justify-center gap-2'>
              <Button variant='outline' className='rounded-[100px]' onClick={e => setEdit(false)}>Cancel</Button>
              <Button 
                variant='outline' 
                className='rounded-[100px] bg-blue-500 text-white border-none'
                onClick={e => EventEmitter.emit(Events.download)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className='top-0 min-w-[196px] h-full shadow-md'>
          <Settings settings={settingMenu} />
        </div>
      </div>
    </div>
  )
}

export default ImgEditor