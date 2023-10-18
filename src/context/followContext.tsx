import React,{createContext,useState, useContext, useEffect} from 'react'
import {supabase} from '../supabase/client'
import {UseContext} from '../context/userContext'

interface Props {
    children: React.ReactNode
}

type follow = {
    followingId : number | undefined
    followerId : number | undefined
}

interface FollowState {
    follow : follow
}

const initialState = {
    follow:{
        followerId: 0,
        followingId: 0
    }
}

export const UsingFollowContext = ()=>{
    const context = useContext(FollowContext)
    return context
}

export const FollowContext = createContext<FollowState>(initialState)

function FollowContextProvider({children}:Props)  {

    const {user} = UseContext()

    const gettingFollow = async ()=>{
        const data1 = await supabase.from('follow').select().eq('followerId', user?.id)
        const data2 = await supabase.from('follow').select().eq('followingId', user?.id)

        // setFollow(data)
        setFollow({...follow, followingId: data1.data?.length ?? 0})
        setFollow({...follow, followerId: data2.data?.length ?? 0})
    }


    const [follow, setFollow] = useState({
        followingId : 0,
        followerId : 0
    })

    const value= {
        follow
    }

    useEffect(()=>{
        console.log(user)
        if(user){
            gettingFollow()
        }
    },[])

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  )
}

export default FollowContextProvider