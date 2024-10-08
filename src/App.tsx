import { useContext } from 'react'
import Uploader from './components/uploader'
import { FileContext, FileContextProvider } from './lib/fileContext'
import ImgEditor from './components/imgEditor'
import { EditContext } from './lib/editContext'
import { cn } from './lib/utils'
import { ImageAjustContextProvider } from './lib/imageAdjustContext'

function App() {
  const {edit} = useContext(EditContext)
  return (
    <div className={cn('h-[100vh] w-[100vw] flex justify-center items-center relative', {'bg-slate-400': edit})}>
      {edit ? <>
        <ImageAjustContextProvider>
          <ImgEditor />
        </ImageAjustContextProvider>
      </> : <>
        <Uploader />
      </>}
    </div>
  )
}

export default App
