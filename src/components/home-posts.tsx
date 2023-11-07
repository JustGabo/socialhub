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

  const absDiff = Math.abs(diff);

  // if it's less than an hour, format to minutes
  if (absDiff < hour) {
    const minutes = Math.floor(diff / 1000 / 60);

    return relativeTime.format(minutes, "minute");
  }

  // if it's less than a day, format to hours
  if (absDiff < day) {
    const hours = Math.floor(diff / 1000 / 60 / 60);
    return relativeTime.format(hours, "hour");
  }

  // if it's less than a week, format to days
  if (absDiff < week) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    return relativeTime.format(days, "day");
  }

  // if it's less than a month, format to weeks
  if (absDiff < week * 4) {
    const weeks = Math.floor(diff / 1000 / 60 / 60 / 24 / 7);
    return relativeTime.format(weeks, "week");
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
            <div className="flex items-center gap-1">
              <h3 className="text-sm leading-none">{post.posterUsername}:</h3>
              <p className="text-xs font-light  flex items-center leading-3">
                {post.caption}
              </p>
              <small className="ml-auto">
                {getRelativeTime(post.created_at)}
              </small>
            </div>
            <Link className="text-xs text-muted" to={`/comments/${post.id}`}>
              View Comments
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default HomePosts;
