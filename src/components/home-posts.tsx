import {useState, useEffect} from 'react'
import {supabase} from '../supabase/client'
import {Posts} from '../types/index'

function HomePosts() {
    // usages
    const [posts, setPosts] = useState<Posts[] | null>(null)

    // functions
    const gettingPosts = async ()=>{
        const res = await supabase.from('posts').select('*').order('id', {ascending: false})
        setPosts(res.data)
    }

    // useeffects
    useEffect(()=>{
        gettingPosts()
    },[])

  return (
    <div className='grid gap-10 w-[95%] m-auto mb-10'>
        {posts?.map((post)=>{
            return (
                <div className='flex flex-col gap-2' key={post.id}>
                    <img className='min-h-max rounded-md w-full object-fill' src={post.url} alt="" />
                    <p className='text-xs '>{post.caption}</p>
                </div>
            )
        })}
    </div>
  )
}

export default HomePosts
