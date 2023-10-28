import { useEffect, useState, useCallback } from "react";
import { UsingAccountContext } from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import { UsingFollowContext } from "../context/followContext";
import { UserCircle2 } from "lucide-react";
import { supabase } from "../supabase/client";

function UserPageHeader() {
  // usages
  const { account } = UsingAccountContext();
  const { user } = UseContext();
  const { followers, following } = UsingFollowContext();
  const [posts, setPosts] = useState(0);
  const navigate = useNavigate();

  // functions

  const redirect = () => {
    if (!user) {
      navigate("/login");
    }
  };

  const getPost = async () => {
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("posterId", user?.id);

    setPosts(count || 0);
  };

  // useeffects

  useEffect(() => {
    redirect();
    getPost();
    console.log(user);
    console.log(followers,following);
  }, [user]);

  return (
    <div className="">
      {account ? (
        <div className="px-4 text-primary">
          <header className="flex flex-col items-center gap-3">
            {account.image ? (
              <img
                className="w-[25%] aspect-square object-cover rounded-full"
                src={account.image}
                alt=""
              />
            ) : (
              <UserCircle2 width="25%" height="25%" strokeWidth={0.5} />
            )}

            <h2>{account.username}</h2>
            <div className="flex justify-between w-[75%]">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Followers</h3>
                <p className="text-xs">{followers}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold">Post</h3>
                <p className="text-xs">{posts}</p>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-semibold">Following</h3>
                <p className="text-xs">{following}</p>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <h2>Waiting</h2>
      )}
    </div>
  );
}

export default UserPageHeader;
