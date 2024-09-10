import { createContext, useState } from "react";


export const FileContext = createContext(null)

export const FileContextProvider = ({children}) => {
  const [file, setFile] = useState(null)
  return (
    <FileContext.Provider value={{file: file, setFile: setFile}}>
      {children}
    </FileContext.Provider>
  )
}
