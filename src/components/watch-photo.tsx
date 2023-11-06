import {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import { ChevronLeft, UserCircle2 } from "lucide-react";
import { Posts } from "../types/index";
import { supabase } from "../supabase/client";

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
              <main key={post.id} className="flex flex-col mt-6 gap-2">
                <section className="flex items-center gap-2">
                  {post.posterImg ?                   <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={post.posterImg}
                    alt=""
                  /> : <UserCircle2 className="w-8 h-8 text-primary" />}

                  <p className="text-xs">{post.posterUsername}</p>
                  </section>
                <img
                  className="min-h-max rounded-md w-full object-fill"
                  src={post.url}
                  alt=""
                />
                <section className="flex items-center gap-1">
                  <h3 className="text-sm font-medium">{post.posterUsername}:</h3>
                <p className="text-sm font-light leading-3  ">
                  {post.caption}
                </p>
                </section>

                <Link
                  className="text-xs text-muted"
                  to={`/post/comments/${post.id}`}
                >
                  View Comments
                </Link>
              </main>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default WatchPhoto;
