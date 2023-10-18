import { ChevronLeft } from 'lucide-react'
import  { useState } from 'react'

function SearchBar() {

  const [active, setActive] = useState(false)
  const [backActive, setBackActive] =useState(false)


  return (
    <div className='relative h-screen px-4 py-6'>
        <form action="" className='flex items-center gap-2 '>
          <button onClick={()=>{
            setActive(false)
            setBackActive(false)
          }} className={`${backActive ? 'flex' : 'hidden'}  `}><ChevronLeft/></button>
            <input onClick={()=>{
              setBackActive(true)
              setActive(true)
            }} className='w-full p-2 text-xs rounded-lg outline-none bg-neutral-800'  type="text" placeholder='search account'/>
        </form>


        <main className={`${active? 'flex' : 'hidden'} mt-3 h-[90%]  absolute w-[92%]`}>
          <h1>main</h1>
        </main>
    </div>  
  )
}

export default SearchBar