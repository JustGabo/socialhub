import { ChevronLeft, UserCircle2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import {  useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";

interface Usuario {
  id: string;
  username: string;
  image: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

function SearchBar() {
  // states and usses
  const [active, setActive] = useState(false);
  const [backActive, setBackActive] = useState(false);
  const [users, setUsers] = useState<Usuario[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<Usuario[]>([]);
  const navigate = useNavigate();
  const [input, setInput] = useState<String | null>(null);

  // functions
  const searchUser = async () => {
    const res = await supabase.from("usuario").select();
    setUsers(res.data);
  };

  const settingInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value == "") {
      setFilteredUsers([]);
      return;
    }

    const filter = users?.filter((user: Usuario) => {
      return user.username.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredUsers(filter!);
  };

  // useeffect
  useEffect(() => {
    searchUser();
  }, []);

  return (
    <div className="relative h-screen px-4 py-6 text-primary">
      <form action="" className="flex items-center gap-2 mb-5">
        <button
          onClick={() => {
            setActive(false);
            setBackActive(false);
          }}
          className={`${backActive ? "flex" : "hidden"}  text-primary`}
        >
          <ChevronLeft />
        </button>
        <Input
          onClick={() => {
            setBackActive(true);
            setActive(true);
          }}
          onChange={(e) => {
            search(e);
            settingInputValue(e);
          }}
          className="w-full p-2 text-xs  shadow-xl rounded-lg outline-none "
          type="text"
          placeholder="search account"
        />
      </form>

      <main
        className={`${
          active ? "flex" : "hidden"
        } mt-3 h-[90%]  absolute w-[92%] `}
      >
        <div className="w-full h-full ">
          <div className="h-[90%] w-full flex flex-col gap-2 overflow-y-scroll">
            {filteredUsers?.map((user: Usuario) => {
              return (
                  <div
                    className="border rounded-lg border-primary/20 shadow-lg flex items-center"
                    key={user.id}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/userdetails/${user.username}`);
                    }}
                  >
                    <div className="h-[70px] px-4 text-xs  flex gap-3 items-center">
                      <div className="flex items-center">
                        {user.image ? (
                          <img
                            className="w-12 aspect-square object-cover rounded-full border border-primary"
                            src={user.image}
                            alt=""
                          />
                        ) : (
                          <UserCircle2
                            width="50px"
                            height="50px"
                            strokeWidth={0.5}
                          />
                        )}
                      </div>
                      <h2>{user.username}</h2>
                    </div>
                  </div>
              );
            })}

            {input == null ? (
              <p className="text-gray-500 text-sm">
                Start typing to search for an account
              </p>
            ) : filteredUsers?.length == 0 && input !== "" ? (
              <p className="text-gray-500 text-sm">
                No user found with the name{" "}
                <span className="font-medium text-primary">{input}</span>
              </p>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchBar;
