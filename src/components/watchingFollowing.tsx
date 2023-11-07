// import { ChevronLeft, UserCircle2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { supabase } from "../supabase/client";
// import { Follower } from "../types/index";

function WatchingFollowing() {
  // const { id } = useParams();
  // const [followings, setFollowings] = useState<Follower[] | null>([]);
  // const [followingId, setFollowingId] = useState('')
  // const [name, setName] = useState('')


  // const gettingFollowing = async () => {
  //   const {data} = await supabase.from("follow").select("*").eq("followerId", id).single();
  //   // setFollowings(res.data);
  //   console.log(data.followingId)

  // };


  // const gettingUser = async () => {
  //   const {data} = await supabase.from('usuario').select('username').eq('id', id).single()
  //   setName(data?.username)
  // }


  // useEffect(() => {
  //   gettingFollowing();
  //   gettingUser()
  // }, []);

  return (
    <div>HI</div>
    // <div className="py-6 px-4">
    //   <header className="mb2">
    //     <Link to={`/userdetails/${name}`} className="bg-transparent p-0">
    //       <ChevronLeft
    //         className="text-primary"
    //         strokeWidth={1.2}
    //         width={25}
    //         height={25}
    //       />
    //     </Link>
    //   </header>
    //   <main className="mt-10">
    //     <h2 className="text-center">Following</h2>
    //     <section className="flex flex-col gap-3 mt-10">
    //       {followings?.length == 0 ? (
    //         <h2 className="flex mt-44 items-center justify-center">
    //           This user doesn't follow anyone yet
    //         </h2>
    //       ) : (
    //         followings?.map((follower) => {
    //           return (
    //             <div className=" flex items-center shadow-2xl gap-1 border border-primary/30 rounded-md p-2" key={follower.id}>
                  
    //               {follower.followerImg ? <img src={follower.followerImg} alt="" /> : <UserCircle2 className="text-primary/75" width="15%" height="15%" strokeWidth={0.5} /> }
    //               <h2 className="text-sm font-light">{follower.followerName}</h2>
    //             </div>
    //           );
    //         })
    //       )}
    //     </section>
    //   </main>
    // </div>
  );
}

export default WatchingFollowing;
