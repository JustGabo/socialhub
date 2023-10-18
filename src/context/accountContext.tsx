import { useState, useContext, createContext, useEffect } from "react";
import { supabase } from "../supabase/client";
import { UseContext } from "../context/userContext";

interface Props {
  children: React.ReactNode;
}

type account = {
  username: string | null;
  bio: string | null;
  image: string | null;
};

interface accountState {
  account: account;
}

const initialState: accountState = {
  account: {
    username: "",
    bio: "",
    image: "",
  },

};

export const AccountContext = createContext<accountState>(initialState);

export const UsingAccountContext = () => {
  const context = useContext(AccountContext);
  return context;
};

function AccountContextProvider({ children }: Props) {
  const { user } = UseContext();

  const gettingAccount = async () => {
    const {
      data: { bio, image, username },
    } = await supabase.from("usuario").select().eq("id", user?.id).single();
    

    setAccount({ username, bio, image });
  };

  const [account, setAccount] = useState({
    username: "",
    bio: "",
    image: "",
  });

  const value = {
    account,
  };

  useEffect(() => {
    if (user) {
      gettingAccount();
    }
  }, []);

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export default AccountContextProvider;
