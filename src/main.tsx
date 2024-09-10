import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FileContextProvider } from './lib/fileContext.tsx'

createRoot(document.getElementById('root')!).render(
  <FileContextProvider>
    <App />
  </FileContextProvider>
)
