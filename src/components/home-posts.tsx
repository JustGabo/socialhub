import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { Posts } from "../types/index";
import { UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const getRelativeTime = (date: string) => {
  const currentDate = new Date(date);
  const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const diff = currentDate.getTime() - Date.now();

  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;
  const week = day * 7;

  if (diff < hour) {
    return relativeTime.format(Math.ceil(diff / 1000 / 60 / 60), "minutes");
  } else if (diff < day) {
    return relativeTime.format(Math.ceil(diff / hour), "hours");
  } else if (diff < week) {
    return relativeTime.format(Math.ceil(diff / day), "days");
  } else {
    return relativeTime.format(Math.ceil(diff / week), "weeks");
  }
};

function HomePosts() {
  // usages
  const [posts, setPosts] = useState<Posts[] | null>(null);

  // functions
  const gettingPosts = async () => {
    const res = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: false });
    setPosts(res.data);
  };

  // useeffects
  useEffect(() => {
    gettingPosts();
  }, []);

  return (
    <div className="grid gap-10 w-[95%] m-auto mb-10">
      {posts?.map((post) => {
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
              <span className="text-xs font-medium">{post.posterUsername}</span>
            </div>

            <img
              className="min-h-max rounded-md w-full object-fill"
              src={post.url}
              alt=""
            />
            <div className="flex items-center gap-2">
              <h3 className="text-sm leading-none">{post.posterUsername} :</h3>
              <p className="text-xs font-light leading-normal ">
                {post.caption}
              </p>
              <small className="ml-auto">
                {getRelativeTime(post.created_at)}
              </small>
            </div>
            <Link className="text-xs text-muted" to={`/post/comments/${post.id}`}>View Comments</Link>
          </div>
        );
      })}
    </div>
  );
}

export default HomePosts;
