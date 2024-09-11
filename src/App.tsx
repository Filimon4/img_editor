import { useContext } from 'react'
import Uploader from './components/uploader'
import { FileContext, FileContextProvider } from './lib/fileContext'
import ImgEditor from './components/imgEditor'

function App() {
  const {file} = useContext(FileContext)
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center relative'>
      <Uploader />
    </div>
  )
}

export default App
