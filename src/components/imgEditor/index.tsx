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

const ImgEditor = () => {
  const {file} = useContext(FileContext);
  const [changes, setChanges] = useState({
    crop_ration: ''
  })
  const [settingMenu, setSettingMenu] = useState<ESettingsMenu | null>(null)

  if (!file) return <></>

  const getSettings = settigsMenuConfig[settingMenu]

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
          {editorNav.map((obj, i) => (
            <Button key={i} onClick={e => setSettingMenu(obj.menu)} variant='ghost' className='rounded-none'>
              <img src={obj.img} alt="crop" width={20} height={20} />
              {obj.text}
            </Button>
          ))}
          <Separator className='mb-2 mt-2'/>
          {dropdownNav.map((obj, i) => (
              <DropdownMenu key={i}>
                <DropdownMenuTrigger className='flex justify-center'>
                  <img src={obj.img} alt="crop" width={20} height={20} />
                  {obj.text}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {obj.menu.map((m, i) => (
                    <DropdownMenuItem key={i}>{m.text}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
          ))}
        </div>
        <div className='flex flex-col w-full h-full'>
          <div className='h-full w-full flex justify-center items-center'>
            <CanvasEditor />
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
          {getSettings && <>
            {getSettings.map((obj, i) => {
              if (obj.type == ESettingTypes.select) {
                return (
                  <div key={i}>
                    <p>{obj.text}</p>
                      <Select defaultValue={obj.select[0]}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                          <SelectContent>
                            {obj.select.map((s, i) => (
                              <SelectItem key={i} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                    </Select>
                  </div>
                )
              } else if (obj.type == ESettingTypes.input) {
                return (
                  <div key={i}>
                    <p>{obj.text}</p>
                    <Input type={obj.input.type} />
                  </div>
                )
              } else if (obj.type == ESettingTypes.checkbox) {
                return (
                  <div className='flex justify-center items-start gap-3'>
                    <Checkbox id={obj.input.id} />
                    <label
                      htmlFor={obj.input.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {obj.text}
                    </label>
                  </div>
                )
              } else if (obj.type == ESettingTypes.imgbox) {
                return  (
                  <div key={i}>
                    <p>{obj.text}</p>
                    <ResizablePanelGroup direction="horizontal">
                      {obj.imgbox.map((b, i) => (
                        <ResizablePanel key={i}>
                          <Button variant='outline' className='w-[74px] h-[56px]'>
                            {b.type == ERotaionTypes.left && <MdRotateLeft className='size-[30px]'/>}
                            {b.type == ERotaionTypes.right && <MdRotateRight className='size-[30px]'/>}
                            {b.type == ERotaionTypes.hor && <LuFlipHorizontal className='size-[30px]'/>}
                            {b.type == ERotaionTypes.ver && <LuFlipVertical className='size-[30px]'/>}
                          </Button>
                        </ResizablePanel>
                      ))}
                    </ResizablePanelGroup>
                  </div>
                )
              } else if (obj.type == ESettingTypes.negslider) {
                return (
                  <div key={i}>
                    <p>{obj.text}</p>
                    <SliderRange defaultValue={[0]} min={-100} max={100} step={1} />
                  </div>
                )
              } else if (obj.type == ESettingTypes.gallery) {
                return (
                  <div key={i} className='grid grid-cols-2 auto-rows-auto' >
                    {obj.gallery.map((m, i) => (
                      <Button key={i} variant='ghost' className='rounded-none'>
                        {m.text}
                      </Button>
                    ))}
                  </div>
                )
              } else {
                return (
                  <></>
                )
              }
            })}
          </>}
        </div>
      </div>
    </div>
  )
}

export default ImgEditor