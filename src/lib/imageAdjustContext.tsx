import { createContext, useState } from "react";
import { DefaultImageAdjust, TImageAdjust } from "./config";


export const ImageAdjustContext = createContext<{adjust: TImageAdjust, setAdjust: React.Dispatch<React.SetStateAction<TImageAdjust>>}>(null)

export const ImageAjustContextProvider = ({children}) => {
  const [adjust, setAdjust] = useState<TImageAdjust>(DefaultImageAdjust)

  return (
    <ImageAdjustContext.Provider value={{adjust: adjust, setAdjust: setAdjust}}>
      {children}
    </ImageAdjustContext.Provider>
  )

}
