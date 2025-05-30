import { createContext,useState,useEffect } from "react";

const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {
    const[user,setUser]=useState(null)

    useEffect(()=>{
        const storedUser=localStorage.getItem("user")
        if(storedUser){
            setUser(JSON.parse(storedUser))
        }
    },[])

    const login=({username,name,uid})=>{
        const newUser={username,name,uid}
        localStorage.setItem("user",JSON.stringify(newUser))
        setUser(newUser)
    }

    const logout=()=>{
        setUser(null)
        localStorage.removeItem("user")
    }


    return(
        <UserContext.Provider value={{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext}