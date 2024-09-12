import { FileContext } from '@/lib/fileContext'
import { cn } from '@/lib/utils';
import React, { useContext, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { Button } from '../ui/button';
import { dropdownNav, editorNav, ERotaionTypes, ESettingsMenu, ESettingTypes, settigsMenuConfig } from '@/lib/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable';
import { MdRotateLeft, MdRotateRight } from "react-icons/md";
import { LuFlipHorizontal, LuFlipVertical } from "react-icons/lu";
import { SliderRange } from '../ui/range-slider';
import CanvasEditor from '../canvas';
import Nav from './Nav';
import Settings from './Settings';
import { ImageAdjustContext } from '@/lib/imageAdjustContext';

const ImgEditor = () => {
  const {file} = useContext(FileContext);
  
  const [settingMenu, setSettingMenu] = useState<ESettingsMenu | null>(null)

  if (!file) return <></>

  return (
    <div className='w-[1296px] h-[634px] bg-white relative rounded-md flex flex-col'>
      <div className='flex justify-between items-center p-2 shadow-md'>
        <h1 className='text-xl font-semibold'>Image Editor</h1>
        <div className='flex justify-center items-center relative'>
          <span className={'w-[130%] h-[130%] absolute bg-slate-200 rounded-full z-10'}></span>
          <IoClose className={'w-[26px] h-[26px] z-20'} />
        </div>
      </div>
      <div className='relative h-full w-full flex justify-normal'>
        <div className='min-w-[196px] h-full flex flex-col shadow-md'>
          <Nav setSettingMenu={setSettingMenu} />
        </div>
        <div className='flex flex-col w-full h-full'>
          <div className='h-full w-full flex justify-center items-center p-4'>
            <CanvasEditor editType={settingMenu} />
          </div>
          <div className='h-[56px] w-full shadow-inner flex justify-between items-center pl-2 pr-2'>
            <Button variant='ghost'>Revert to Original</Button>
            <div>
              <Button variant='ghost'>
                <img src="public/redo.svg" alt="redo" />
              </Button>
              <Button variant='ghost'>
                <img src="public/undo.svg" alt="undo" />
              </Button>
            </div>
            <div className='flex justify-center gap-2'>
              <Button variant='outline' className='rounded-[100px]'>Cancel</Button>
              <Button variant='outline' className='rounded-[100px] bg-blue-500 text-white border-none'>Save</Button>
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