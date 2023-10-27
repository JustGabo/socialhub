import { useEffect, useState } from "react";
import { Settings, ChevronLeft, LogOut, Trash, Pencil } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/client";

function ProfileMenu() {
  // usages
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [gettingOut, setGettingOut] = useState(false);

  //   functions
  const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    setGettingOut(true);
    setTimeout(() => {
        if(!error){
            navigate("/login");
        }
    }, 2000);
  };

  // useEffect

  return (
    <div className="">
      <header className="flex items-center justify-between w-[95%] m-auto">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <ChevronLeft strokeWidth={1} width={25} height={25} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <Settings width={20} height={20} strokeWidth={1} />
        </button>
      </header>

      <div
        className={`h-screen absolute ${
          open ? "right-0" : "right-0 opacity-0"
        } w-[60%] bg-primary p-4  flex flex-col  rounded-sm gap-5 transition-all duration-500`}
      >
        <div className="relative h-full">
          <Link to={'/edit'} className="flex items-center gap-2">
            <Pencil width={15} height={15} strokeWidth={1}/>
            <p className="text-sm">Edit</p>
          </Link>
          <p>Change Password</p>
          <ul className="absolute bottom-10 flex flex-col gap-3">
            <li>
              <button
                className="flex items-center  text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
              >
                <LogOut width={20} height={20} strokeWidth={1} />
                <span className="ml-2">Log Out</span>
              </button>
            </li>

            <button
              className="flex items-center  text-sm"
              onClick={() => {
                navigate("/login");
              }}
            >
              <Trash width={20} height={20} strokeWidth={1} />
              <span className="ml-2">Delete Account</span>
            </button>
          </ul>
        </div>
      </div>
      {gettingOut && (
        <div className="absolute w-full h-screen bg-primary top-0 opacity-75">
          <div className="flex items-center justify-center h-full">
            <h2 className="text-center text-2xl">Getting Out...</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
