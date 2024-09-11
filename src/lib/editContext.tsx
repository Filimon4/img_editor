import { createContext, useState } from "react"

export const EditContext = createContext(null)

export const EditContextProvider = ({children}) => {
  const [edit, setEdit] = useState(false)
  return (
    <EditContext.Provider value={{edit: edit, setEdit: setEdit}}>
      {children}
    </EditContext.Provider>
  )

}