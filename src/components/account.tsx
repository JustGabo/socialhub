import {User} from '../types/index'

function Account(user: User) {
  return (
    <div className='h-[30px] border border-gray-500 flex gap-5 items-center'>
        <img src={user.image} alt="" />
        <h2>{user.username}</h2>
    </div>
  )
}

export default Account