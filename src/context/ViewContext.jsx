import { createContext,useState } from "react";

const ViewContext = createContext(null)

export const ViewContextProvider = ({children}) => {
    const [view,setView] = useState('home')

    return (
        <ViewContext.Provider value={{view,setView}}>
            {children}
        </ViewContext.Provider>
    )
}

export {ViewContext}