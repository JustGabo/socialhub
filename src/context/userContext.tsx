import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabase/client";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextState {
  email: string;
  user: User | null;
}

const initialState = {
  email: "",
  user: null,
};

export const UseContext = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserContext = createContext<UserContextState>(initialState);

function UserContextProvider({ children }: UserContextProps) {
  const usuario = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoading(false);
  };

  const navigate = useNavigate();

  const checkingUser = async () => {
    await supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        usuario();
      }
    });
  };

  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<User | null>(null);

  const [email] = useState<string>("");

  const value = {
    email,
    user,
  };

  useEffect(() => {
    usuario();
    checkingUser();
  }, [user]);

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
