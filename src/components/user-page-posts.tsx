import { supabase } from "../supabase/client";
import { UseContext } from "../context/userContext";
import { useState, useEffect } from "react";
import { Posts } from "../types/index";

function UserPagePosts() {
  const { user } = UseContext();

  const [posts, setPosts] = useState<Posts[]>([]);

  // functions

  const gettingPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("posterId", user?.id);
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

  useEffect(() => {
    if (posts) {
      console.log(posts);
    }
  }, [posts]);

  return (
    <div className="border-t border-primary text-secondary pt-10">
      <main className="pt-2 grid grid-cols-2 gap-[1px]">
        {posts.length == 0 ? (
          <h1>No hay posts</h1>
        ) : (
          <div>
            {posts?.map((post) => {
              return (
                <ul>
                  <img
                    className=""
                    key={post.id}
                    src={post.url}
                    alt={post.caption}
                  />

                  <p>{post.caption}</p>
                </ul>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default UserPagePosts;
