import { dropdownNav, editorNav } from '@/lib/config'
import React, { memo } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const Nav = memo(({setSettingMenu}: {setSettingMenu: (e: number) => void}) => {
  return (
    <>
      {editorNav.map((obj, i) => (
        <Button key={i} onClick={e => setSettingMenu(obj.menu)} variant='ghost' className='rounded-none'>
          <img src={obj.img} alt="crop" width={20} height={20} />
          {obj.text}
        </Button>
      ))}
      <Separator className='mb-2 mt-sssss2'/>
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
    </>
  )
})

export default Nav