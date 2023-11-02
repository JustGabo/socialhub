import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { supabase } from "../supabase/client";
import { useState } from "react";
import { Posts } from "../types/index";

interface Props {
  id: string;
}

function WatchPhoto({ id }: Props) {
  // usages
  const [posts, setPosts] = useState<Posts[] | null>(null);

  //   functions
  const getPost = async () => {
    const { data } = await supabase.from("posts").select("*").eq("id", id);
    // const { count } = await supabase
    //   .from("posts")
    //   .select("*", { count: "exact", head: true })
    //   .eq("posterId", user?.id);

    if (data) {
      setPosts(data ?? []);
    }
  };

  //   useeffects
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <section className="absolute w-full h-screen p-4 bg-secondary top-0 pt-14">
        <header className="flex items-center gap-2 mb-5 bg-secondary border-b border-primary/25 fixed top-0 w-full ring-0 left-0 p-3">
          <Link to={"/profile"}>
            <ChevronLeft className="w-6 h-6 text-primary" />
          </Link>
          <p>Posts</p>
        </header>
        <div className="">
          {posts?.map((post) => {
            return (
              <div key={post.id} className="flex flex-col gap-2">
                <img
                  className="min-h-max rounded-md w-full object-fill"
                  src={post.url}
                  alt=""
                />
                <p className="text-xs font-light leading-normal">
                  {post.caption}
                </p>
                <Link
                  className="text-xs text-muted"
                  to={`/post/comments/${post.id}`}
                >
                  View Comments
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default WatchPhoto;