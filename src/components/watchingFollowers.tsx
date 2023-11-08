import { ChevronLeft, UserCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Follower } from "../types/index";

function WatchingFollow() {
  //usages
  const { id } = useParams();
  const [followers, setFollowers] = useState<Follower[] | null>([]);
  const [name, setName] = useState('')

  // functions

  const gettingFollowers = async () => {
    const res = await supabase.from("follow").select("*").eq("followingId", id);
    setFollowers(res.data);
  };

  const gettingUser = async () => {
    const {data} = await supabase.from('usuario').select('username').eq('id', id).single()
    setName(data?.username)
  }

  // useeffects

  useEffect(() => {
    gettingFollowers();
    gettingUser()
  }, []);

  return (
    <div className="py-6 px-4">
      <header className="mb2">
        <Link to={`/userdetails/${name}`} className="bg-transparent p-0">
          <ChevronLeft
            className="text-primary"
            strokeWidth={1.2}
            width={25}
            height={25}
          />
        </Link>
      </header>
      <main className="mt-10">
        <h2 className="text-center">Followers</h2>
        <section className="flex flex-col gap-3 mt-10">
          {followers?.length == 0 ? (
            <h2 className="flex mt-44 items-center justify-center">
              This user don't have followers
            </h2>
          ) : (
            followers?.map((follower) => {
              return (
                <Link to={`/userdetails/${follower.followerName}`} className=" flex items-center shadow-2xl gap-1 border border-primary/30 rounded-md p-2" key={follower.id}>
                  
                  {follower.followerImg ? <img src={follower.followerImg} alt="" /> : <UserCircle2 className="text-primary/75" width="15%" height="15%" strokeWidth={0.5} /> }
                  <h2 className="text-sm font-light">{follower.followerName}</h2>
                </Link>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
}

export default WatchingFollow;
