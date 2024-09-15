import { ERotaionTypes, ESettingsMenu, ESettingTypes, Events, settigsMenuConfig, TImageAdjust } from '@/lib/config'
import React, { memo, useContext } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { ResizablePanel, ResizablePanelGroup } from '../ui/resizable'
import { Button } from '../ui/button'
import { SliderRange } from '../ui/range-slider'
import { MdRotateLeft, MdRotateRight } from 'react-icons/md'
import { LuFlipHorizontal, LuFlipVertical } from 'react-icons/lu'
import { ImageAdjustContext } from '@/lib/imageAdjustContext'
import EventEmitter from "reactjs-eventemitter";

const Settings = memo(({settings}: {settings: ESettingsMenu | null}) => {
  const {adjust, setAdjust} = useContext(ImageAdjustContext)
  const getSettings = settigsMenuConfig[settings]
  
  const setAdjustments = (obj: any) => {
    const {editType, editValue, value} = obj
    switch (settings) {
      case ESettingsMenu.adjust:
        const settingsAbjust: TImageAdjust['adjust'] = {
          ...adjust.adjust,
          [editValue]: value
        }
        setAdjust({...adjust, adjust: settingsAbjust})
        break
      case ESettingsMenu.crop:
        const settingsCrop: TImageAdjust['crop'] = {
          ...adjust.crop,
          [editValue]: value
        }
        setAdjust({...adjust, crop: settingsCrop})
        break
      case ESettingsMenu.filter:
        const settingsFilter: TImageAdjust['filter'] = {
          ...adjust.filter,
          [value.editType]: value.editValue
        }
        setAdjust({...adjust, filter: settingsFilter})
        EventEmitter.emit(Events.applyFilters, settingsFilter)
        break
      case ESettingsMenu.resize:
        if (obj.input.type == 'number') {
          obj.value = Number(value)
        }
        const settingsResize: TImageAdjust['resize'] = {
          ...adjust.resize,
          [editValue]: value
        }
        setAdjust({...adjust, resize: settingsResize})
        break
      case ESettingsMenu.rotate:
        let settingsRotate: TImageAdjust['rotate'] = {
          ...adjust.rotate,
        }

        if (value.editType == 'deg') {
          settingsRotate.deg = adjust.rotate.deg + value.editValue
        }
        if (value.editType == 'flip') {
          if (value.editValue == 'hor') {
            settingsRotate.flip.hor = !adjust.rotate.flip.hor
          }
          if (value.editValue == 'ver') {
            settingsRotate.flip.ver = !adjust.rotate.flip.ver
          }
        }
        setAdjust({...adjust, rotate: settingsRotate})
        EventEmitter.emit(Events.applyRotate, settingsRotate)
        break  
      case ESettingsMenu.circle:
      case ESettingsMenu.line:
      case ESettingsMenu.rect:
      case ESettingsMenu.text:
      default:
    }
  }

  return (
    <>
    {getSettings && <>
        {getSettings.map((obj, i) => {
          if (obj.type == ESettingTypes.select) {
            return (
              <div key={i}>
                <p>{obj.text}</p>
                  <Select defaultValue={obj.select[0]} onValueChange={e => setAdjustments({...obj, value: e})}>
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
                <Input type={obj.input.type} onChange={e => setAdjustments({...obj, value: e.target.value})} value={adjust[obj.editType][obj.editValue]} />
              </div>
            )
          } else if (obj.type == ESettingTypes.checkbox) {
            return (
              <div className='flex justify-center items-start gap-3'>
                <Checkbox id={obj.input.id} onCheckedChange={e => setAdjustments({...obj, value: e})} checked={adjust[obj.editType][obj.editValue]} />
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
                      <Button variant='outline' className='w-[74px] h-[56px]' onClick={e => setAdjustments({...obj, value: b})}>
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
                <SliderRange defaultValue={[0]} min={-100} max={100} step={1} onValueChange={e => setAdjustments({...obj, value: e[0]})} />
              </div>
            )
          } else if (obj.type == ESettingTypes.gallery) {
            return (
              <div key={i} className='grid grid-cols-2 auto-rows-auto' >
                {obj.gallery.map((m, i) => (
                  <Button key={i} variant='ghost' className='rounded-none' onClick={e => setAdjustments({...obj, value: m})}>
                    {m.text}
                  </Button>
                ))}
              </div>
            )
          } else if (obj.type == ESettingTypes.submit) {
            return (
              <div key={i} className='grid grid-cols-2 auto-rows-auto' >
                <Button key={i} variant='ghost' className='rounded-none' onClick={e => EventEmitter.emit(obj.emitName, adjust[obj.emitType])}>
                  {obj.text}
                </Button>
              </div>
            )
          } else {
            return (
              <div key={i}></div>
            )
          }
        })}
      </>}
    </>
  )
})

export default Settings