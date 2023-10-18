import {useEffect} from "react";
import {UsingAccountContext} from '../context/accountContext'
import {useNavigate} from 'react-router-dom'
import {UseContext} from '../context/userContext'
import {UsingFollowContext} from '../context/followContext'


function UserPageHeader() {

  const {account} = UsingAccountContext()
  const {user} = UseContext()
  const {follow}= UsingFollowContext()


  const navigate = useNavigate()
  
  const redirect = ()=>{
    if(!user){
      navigate("/login")
    }else{  
      return
    }
  }

  
    useEffect(()=>{
       redirect()
    },[user])

  return (
    <div>
      <header className="flex flex-col items-center gap-3">
        <img
          className="w-[25%] aspect-square object-cover rounded-full"
          src="https://img.freepik.com/foto-gratis/mujer-hermosa-joven-mirando-camara-chica-moda-verano-casual-camiseta-blanca-pantalones-cortos-hembra-positiva-muestra-emociones-faciales-modelo-divertido-aislado-amarillo_158538-15796.jpg"
          alt=""
        />
        <h2>{account.username}</h2>
        <div className="flex justify-between w-[75%]">
          <div className="text-center">
            <h3 className="text-sm font-semibold">Followers</h3>
            <p className="text-xs">{follow.followerId}</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold">Post</h3>
            <p className="text-xs">23</p>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold">Following</h3>
            <p className="text-xs">{follow.followingId}</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default UserPageHeader;
