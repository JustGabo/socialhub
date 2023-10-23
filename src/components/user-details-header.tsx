import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useParams } from "react-router-dom";
import type { User } from "../types";
import { UseContext } from "../context/userContext";
import { UserCircle2 } from "lucide-react";

function UserDetailsHeader() {
  const { username } = useParams();

  const { user } = UseContext();

  // states

  const [account, setAccount] = useState<User | null>(null);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  // functions and fetchs

  const gettingAccount = async () => {
    const { data }: { data: User | null } = await supabase
      .from("usuario")
      .select()
      .eq("username", username)
      .single();
    setAccount(data);
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
    console.log(following);
    console.log(followers);

    setFollowing(following.data?.length ?? 0);
    setFollowers(followers.data?.length ?? 0);
  };

  const follow = async () => {
    const res = await supabase
      .from("follow")
      .insert({ followerId: user?.id, followingId: account?.id });
    return res;
  };

  // useeffect

  useEffect(() => {
    gettingAccount();
    if(account){
    gettingFollow();
    }
  }, []);

  return (
    <div className="px-4 text-white">
      <header className="flex flex-col items-center gap-3">
        {account?.image ? (
          <img
            className="w-[25%] aspect-square object-cover rounded-full"
            src="https://img.freepik.com/foto-gratis/mujer-hermosa-joven-mirando-camara-chica-moda-verano-casual-camiseta-blanca-pantalones-cortos-hembra-positiva-muestra-emociones-faciales-modelo-divertido-aislado-amarillo_158538-15796.jpg"
            alt=""
          />
        ) : (
          <UserCircle2 width='25%' height='25%' strokeWidth={0.5}/>
        )}

        <h2>{account?.username}</h2>
        <div className="flex justify-between w-[75%]">
          <div className="text-center">
            <h3 className="text-sm font-semibold">Followers</h3>
            <p className="text-xs">{followers}</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold">Post</h3>
            <p className="text-xs">23</p>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold">Following</h3>
            <p className="text-xs">{following}</p>
          </div>
        </div>
      </header>

      <div className="w-full mt-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            follow();
          }}
          className="w-full bg-blue-500 h-[30px] rounded-md text-sm"
        >
          Follow
        </button>
      </div>
    </div>
  );
}

export default UserDetailsHeader;
