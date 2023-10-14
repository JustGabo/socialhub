import React,{createContext,useState,useEffect} from 'react'
import {supabase} from '../supabase/client'

interface UserContextProps {
    children: React.ReactNode
}

interface UserContextState {
    email: string
    user: object
}

const initialState = {
    email:"",
    user: {}
}

export const UserContext = createContext<UserContextState>(initialState)


function UserContextProvider({children}: UserContextProps) {

    const usuario = async ()=>{
        const data = await supabase.auth.getUser()
        console.log(data)
    }

    useEffect(()=>{
        usuario()
    },[])

    const [user, ] = useState({})

    const [email, ] = useState<string>("")

    const value = {
        email,
        user
    }

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider