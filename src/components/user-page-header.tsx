import { useEffect, useState } from "react";
import { UsingAccountContext } from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import { UsingFollowContext } from "../context/followContext";
import {  UserCircle2 } from "lucide-react";
import { supabase } from "../supabase/client";
import { Posts } from "../types/index";

function UserPageHeader() {
  // usages
  const { account } = UsingAccountContext();
  const { user } = UseContext();
  const { followers, following } = UsingFollowContext();
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const navigate = useNavigate();

  // functions

  const redirect = () => {
    if (!user) {
      navigate("/login");
    }
  };

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

  // useeffects

  useEffect(() => {
    redirect();
    getPost();
    console.log(account)
  }, [user]);

  return (
    <div className="">
      {account ? (
        <div className="px-4 text-primary">
          <header className="flex flex-col items-center gap-3">
            {account.image ? (
              <img
                className="w-[25%] aspect-square border border-primary object-cover rounded-full"
                src={account.image}
                alt=""
              />
            ) : (
              <UserCircle2 width="25%" height="25%" strokeWidth={0.5} />
            )}

            <h2 className="font-normal text-lg">{account.username}</h2>
            <div className="flex justify-between w-[75%]">
              <div className="text-center font-light">
                <h3 className="text-sm">Followers</h3>
                <p className="text-xs">{followers}</p>
              </div>
              <div className="text-center font-light">
                <h3 className="text-sm">Post</h3>
                <p className="text-xs">{posts?.length}</p>
              </div>

              <div className="text-center font-light">
                <h3 className="text-sm">Following</h3>
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
