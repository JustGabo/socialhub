import {  useState } from "react";
import { Settings, ChevronLeft, LogOut, Trash, Pencil } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components//mode-toggle";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet";

function ProfileMenu() {
  // usages
  const navigate = useNavigate();
  const [gettingOut, setGettingOut] = useState(false);
  const [open, setOpen] = useState(false);

  //   functions

  // useEffect

  return (
    <div className="overflow-x-hidden">
      <header className="flex items-center  justify-between text-primary  w-[95%] m-auto">
        <button
          className="bg-transparent p-0"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <ChevronLeft
            className="text-primary"
            strokeWidth={1.2}
            width={25}
            height={25}
          />
        </button>

        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <Button className="p-0 bg-transparent">
            <SheetTrigger onClick={() => setOpen(true)}>
              <Settings
                className="text-primary"
                width={20}
                height={20}
                strokeWidth={1.5}
              />
            </SheetTrigger>
          </Button>

          <SheetContent>
            <div className="h-full">
              <div className="relative h-full">
                <Button className=" text-primary bg-transparent mt-5">
                  <Link to={"/edit"} className="flex gap-2 items-center">
                    <Pencil width={18} height={18} strokeWidth={1} />
                    <span className="text-sm ml-1">Edit</span>
                  </Link>
                </Button>

                <div className="mt-5">
                </div>

                <ul className="absolute bottom-10 text-primary flex flex-col gap-5">
                <ModeToggle/>

                  <li>
                    <Button
                      className="flex items-center text-primary bg-transparent text-sm"
                      onClick={() => {
                        setGettingOut(true);
                        setOpen(false);
                        setTimeout(() => {
                          supabase.auth.signOut();
                        }, 2000);
                      }}
                    >
                      <LogOut width={20} height={20} strokeWidth={1} />
                      <span className="ml-2 text-sm">Log Out</span>
                    </Button>
                  </li>

                  <Button
                    className="flex items-center text-red-500 bg-transparent text-sm"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <Trash width={20} height={20} strokeWidth={1} />
                    <span className="ml-2 text-sm">Delete Account</span>
                  </Button>
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {gettingOut && (
        <div className="absolute w-full z-50 h-screen bg-secondary text-primary top-0 opacity-95">
          <div className="flex items-center justify-center h-full ">
            <div className="bg-primary animate-pulse  p-6 rounded-md">
              <h2 className="text-center text-secondary text-sm">Getting Out...</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
