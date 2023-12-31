import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useParams } from "react-router-dom";
import type { User } from "../types";
import { UseContext } from "../context/userContext";
import { UserCircle2 } from "lucide-react";
import { Posts } from "../types/index";
import { Button } from "../components/ui/button";
import { UsingAccountContext } from "../context/accountContext";
import { Follower } from "../types/index";
import { Link } from "react-router-dom";

function UserDetailsHeader() {
  const { username } = useParams();
  const { account: UserAccount } = UsingAccountContext();
  const { user } = UseContext();

  // states

  const [account, setAccount] = useState<User | null>(null);
  const [followers, setFollowers] = useState<Follower[] | null>(null);
  const [following, setFollowing] = useState<Follower[] | null>(null);
  const [posts, setPosts] = useState<Posts[] | null>(null);
  const [load, setLoad] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isYou, setIsYou] = useState(false);
  const [accountExist, setAccountExist] = useState(true);

  // functions and fetchs

  const gettingAccount = async () => {
    const { data }: { data: User | null } = await supabase
      .from("usuario")
      .select()
      .eq("username", username)
      .single();
    setAccount(data);
    setLoad(true);
  };

  const gettingFollow = async () => {
    const following = await supabase
      .from("follow")
      .select()
      .eq("followerId", account?.id);
    const followers = await supabase
      .from("follow")
      .select()
      .eq("followingId", account?.id);

    setFollowing(following.data ?? []);
    setFollowers(followers.data ?? []);
  };

  const follow = async () => {
    const res = await supabase.from("follow").insert({
      followerId: user?.id,
      followingId: account?.id,
      followerName: UserAccount.username,
    });
    if (res.status == 201) {
      setIsFollowing(true);
      gettingFollow();
    }
    return res;
  };

  const stopFollow = async () => {
    const res = await supabase
      .from("follow")
      .delete()
      .eq("followerId", user?.id)
      .eq("followingId", account?.id);
    if (res.status == 204) {
      setIsFollowing(false);
      gettingFollow();
    }
  };

  const getPost = async () => {
    const res = await supabase
      .from("posts")
      .select()
      .eq("posterId", account?.id)
      .order("id", { ascending: false });
    setPosts(res.data);
    console.log(res);
    if (res.error) {
      setAccountExist(false);
    }
  };

  const checkingIsFollowing = () => {
    followers?.map((follower) => {
      if (follower.followerId == user?.id) {
        setIsFollowing(true);
      }
    });
  };

  const checkingIsYou = () => {
    followers?.map((follower) => {
      if (follower.followingId == user?.id) {
        setIsYou(true);
      } else {
        setIsYou(false);
      }
    });
  };

  useEffect(() => {
    gettingAccount();
  }, []);

  useEffect(() => {
    if (followers) {
      checkingIsFollowing();
      checkingIsYou();
    }
  }, [followers]);

  useEffect(() => {
    if (load) {
      gettingFollow();
      getPost();
    }
  }, [load]);

  return (
    <div className="py-5 text-primary flex flex-col gap-5">
      <header className="flex flex-col items-center gap-3">
        {account?.image ? (
          <img
            className="w-24 aspect-square object-cover rounded-full"
            src={account?.image}
            alt=""
          />
        ) : (
          <UserCircle2 width="30%" height="30%" strokeWidth={0.5} />
        )}
        {/* {account?.image ? <img className="w-24 aspect-square object-cover"/> : <UserCircle2 width="40%" height="40%" strokeWidth={0.5} />} */}

        {account?.username ? (
          <h2>{account?.username}</h2>
        ) : (
          <strong>No account</strong>
        )}
        <div className="flex justify-between w-[75%]">
          <Link to={`/watchfollowers/${account?.id}`} className="text-center">
            {followers == null ? (
              <div className="flex flex-col gap-2 items-center">
                <h3 className="animate-pulse w-16 h-3 bg-muted/50 rounded-lg"></h3>
                <p className="animate-pulse w-10 h-3 bg-muted/50 rounded-lg"></p>
              </div>
            ) : (
              <div>
                <h3 className="text-sm">Followers</h3>
                <p className="text-xs">{followers?.length}</p>
              </div>
            )}
          </Link>

          <div>
            {accountExist ? (
              <div>
                {posts == null ? (
                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="animate-pulse w-16 h-3 bg-muted/50 rounded-lg"></h3>
                    <p className="animate-pulse w-10 h-3 bg-muted/50 rounded-lg"></p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 items-center">
                    <h3 className="text-sm ">Post</h3>
                    <p className="text-xs">{posts?.length}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-1 items-center">
                <h3 className="text-sm ">Post</h3>
                <p className="text-xs">0</p>
              </div>
            )}
          </div>

          <div>
            {following == null ? (
              <div className="flex flex-col gap-2 items-center">
                <h3 className="animate-pulse w-16 h-3 bg-muted/50 rounded-lg"></h3>
                <p className="animate-pulse w-10 h-3 bg-muted/50 rounded-lg"></p>
              </div>
            ) : (
              <div className="flex flex-col gap-1 items-center">
                <h3 className="text-sm">Following</h3>
                <p className="text-xs">{following?.length}</p>
              </div>
            )}
          </div>

          {/* <div className="text-center">
            <h3 className="text-sm">Following</h3>
            <p className="text-xs">{following?.length}</p>
          </div> */}
        </div>
      </header>

      <div className="w-full px-4">
        {!isFollowing ? (
          <Button
            disabled={isYou}
            onClick={(e) => {
              e.preventDefault();
              follow();
            }}
            className="bg-blue-500 w-full h-[40px] rounded-md text-sm"
          >
            Follow
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault();
              stopFollow();
            }}
            className="w-full bg-muted h-[40px] rounded-md text-sm"
          >
            Unfollow
          </Button>
        )}
      </div>

      <main className="border-t border-muted w-full text-primary py-4 px-2">
        {accountExist ?         <section className="">
          {posts?.length == 0 ? (
            <div className="flex items-center justify-center pt-28">
              <h1 className="">This user hasn't post yet</h1>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {posts?.map((post) => {
                return (
                  <div key={post.id}>
                    <Link to={`/watchingPost/${post.id}`}>
                      <img
                        className="aspect-square object-cover"
                        src={post.url}
                        alt=""
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section> : <strong className=" flex items-center justify-center h-72">This Account doesn't exist anymore</strong>}
      </main>
    </div>
  );
}

export default UserDetailsHeader;
