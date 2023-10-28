import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../supabase/client";
import { UseContext } from "../context/userContext";

interface Props {
  children: React.ReactNode;
}


interface FollowState {
  followers: number
  following: number
}

const initialState = {
  followers: 0,
  following: 0,
};

export const UsingFollowContext = () => {
  const context = useContext(FollowContext);
  return context;
};

export const FollowContext = createContext<FollowState>(initialState);

function FollowContextProvider({ children }: Props) {
  const { user } = UseContext();


  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const gettingFollow = async () => {
    const data1 = await supabase
      .from("follow")
      .select()
      .eq("followerId", user?.id);
    const data2 = await supabase
      .from("follow")
      .select()
      .eq("followingId", user?.id);

    // setFollow(data)
    setFollowing(data1.data!.length);
    setFollowers(data2.data!.length);
  };

  useEffect(() => {
    if (user) {
      gettingFollow();
    }
  }, [user]);

  const value = {
    followers,
    following
  };

  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
}

export default FollowContextProvider;
