import {supabase} from '../supabase/client'
import {useNavigate} from 'react-router-dom'

export const Redirect = async ()=>{
    const {data:{user}} = await supabase.auth.getUser()
    const navigate = useNavigate()

    if(!user){
        navigate("/login")
        "no hay user"
    }else{
        console.log("si hay user")
    }
}