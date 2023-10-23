import { ChevronLeft, UserCircle2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

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

  // functions
  const searchUser = async () => {
    const res = await supabase.from("usuario").select();
    setUsers(res.data);
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
    <div className="relative h-screen px-4 py-6">
      <form action="" className="flex items-center gap-2 mb-5">
        <button
          onClick={() => {
            setActive(false);
            setBackActive(false);
          }}
          className={`${backActive ? "flex" : "hidden"}  `}
        >
          <ChevronLeft />
        </button>
        <input
          onClick={() => {
            setBackActive(true);
            setActive(true);
          }}
          onChange={(e) => {
            search(e);
          }}
          className="w-full p-2 text-xs rounded-lg outline-none bg-neutral-800"
          type="text"
          placeholder="search account"
        />
      </form>

      <main
        className={`${
          active ? "flex" : "hidden"
        } mt-3 h-[90%]  absolute w-[92%]`}
      >
        <div className="w-full h-full ">
          <div className="h-[90%] w-full overflow-y-scroll">
            {filteredUsers?.map((user: Usuario, i: number) => {
              return (
                <div
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/userdetails/${user.username}`);
                  }}
                >
                  <div className="h-[70px]  mb-3 px-4 text-xs  flex gap-3 items-center">
                    <div>
                      {user.image ? (
                        <img src={user.image} alt="" />
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

            {filteredUsers?.length == 0 && (
              <p className="text-gray-500">
                Start typing to search for an account.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchBar;
