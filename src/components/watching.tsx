import { Posts } from "../types/index";
import { UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function Watching(post: Posts) {
  return (
    <div className="absolute w-full h-screen p-4 bg-secondary top-0 pt-14">
      <header className="flex items-center gap-2 mb-5 bg-secondary border-b border-primary/25 fixed top-0 w-full ring-0 left-0 p-3">
        <Link to={"/"}>
          <ChevronLeft className="w-6 h-6 text-primary" />
        </Link>
        <p>Posts</p>
      </header>
      <div className="flex flex-col gap-2" key={post.id}>
        <div className="flex items-center gap-2">
          {post.posterImg ? (
            <img className="w-8 h-8 rounded-full" src={post.posterImg} alt="" />
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
          <h3 className="text-sm">{post.posterUsername}:</h3>
          <p className="text-xs font-light">{post.caption}</p>
          {/* <small className="ml-auto">
                {getRelativeTime(post.created_at)}
              </small> */}
        </div>
      </div>
    </div>
  );
}

export default Watching;
