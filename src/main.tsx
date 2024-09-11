import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FileContextProvider } from './lib/fileContext.tsx'
import { EditContextProvider } from './lib/editContext.tsx'

createRoot(document.getElementById('root')!).render(
  <EditContextProvider>
    <FileContextProvider>
      <App />
    </FileContextProvider>
  </EditContextProvider>
)
