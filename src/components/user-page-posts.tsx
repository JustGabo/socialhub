import { supabase } from "../supabase/client";
import { UseContext } from "../context/userContext";
import { useState, useEffect } from "react";
import { Posts } from "../types/index";
import {Link} from 'react-router-dom'

function UserPagePosts() {
  const { user } = UseContext();
  const [posts, setPosts] = useState<Posts[]>([]);

  // functions

  const gettingPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("posterId", user?.id).
      order("id", { ascending: false });
    if (data) {
      setPosts(data);
    }
  };

  // useefect
  useEffect(() => {
    if (user) {
      gettingPost();
    }
  }, []);

  return (
    <div className="border-t border-muted text-primary pt-3 px-1">
      <main className="pt-2 ">
        {posts.length == 0 ? (
          <div className="flex items-center justify-center pt-28">
            <h1 className="">This user hasn't post yet</h1>
          </div>
        ) : (
          <div  className="grid grid-cols-3 gap-1">
            {posts?.map((post) => {
              return (
                <Link to={`/watchingOwnPost/${post.id}`} key={post.id}>
                  <img
                    className="aspect-square object-cover"
                    src={post.url}
                    alt=""
                  />
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserPagePosts;
