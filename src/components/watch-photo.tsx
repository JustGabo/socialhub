import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { ChevronLeft, UserCircle2 } from "lucide-react";
import { Posts } from "../types/index";
import {UseContext} from '../context/userContext'
import { supabase } from "../supabase/client";


function WatchPhoto() {
    // usages
    const {user} = UseContext()
  const [posts, setPosts] = useState<Posts[] | null>([]);

//   functions
  const getPost = async () => {
    const res = await supabase
      .from("posts")
      .select("*")
      .eq("posterId", user?.id);
    // const { count } = await supabase
    //   .from("posts")
    //   .select("*", { count: "exact", head: true })
    //   .eq("posterId", user?.id);

    setPosts(res.data);
  };

//   useeffects
useEffect(()=>{
getPost()
},[])

  return (
    <div>
      <section className="absolute w-full h-screen p-4 bg-secondary top-0 pt-14">
        <header className="flex items-center gap-2 mb-5 bg-secondary border-b border-primary/25 fixed top-0 w-full ring-0 left-0 p-3">
          <Link to={"/profile"}>
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Link>
          <p>Posts</p>
        </header>
        <div className="grid gap-10 pb-20">
          {posts?.map((post:Posts) => {
            return (
              <div className="flex flex-col gap-2" key={post.id}>
                <div className="flex items-center gap-2">
                  {post.posterImg ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={post.posterImg}
                      alt=""
                    />
                  ) : (
                    <UserCircle2
                      strokeWidth={1}
                      className="w-5 font-light h-5 rounded-full"
                    />
                  )}
                  <span className="text-xs font-medium">
                    {post.posterUsername}
                  </span>
                </div>

                <img
                  className="min-h-max rounded-md w-full object-fill"
                  src={post.url}
                  alt=""
                />
                <div className="flex items-center gap-1">
                  <h3 className="text-sm">{post.posterUsername}:</h3>
                  <p className="text-xs font-light">{post.caption}</p>
                  {/* <small className="ml-auto">
                {getRelativeTime(post.created_at)}
              </small> */}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default WatchPhoto;
