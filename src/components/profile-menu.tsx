import { useEffect, useState } from "react";
import { Settings, ChevronLeft, LogOut, Trash, Pencil } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
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
      <header className="flex items-center justify-between w-[95%] m-auto">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <ChevronLeft strokeWidth={1} width={25} height={25} />
        </button>

        <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
          <SheetTrigger onClick={() => setOpen(true)}>
            <Settings width={20} height={20} strokeWidth={1} />
          </SheetTrigger>

          <SheetContent>
            <div className="h-full">
              <div className="relative h-full">
                <Link to={"/edit"} >
                  <Button className="flex items-center text-primary bg-transparent mt-5 gap-2">
                    <Pencil width={18} height={18} strokeWidth={1} />
                    <span className="text-sm ml-1">Edit</span>
                  </Button>
                </Link>
                <ul className="absolute bottom-10 text-primary flex flex-col gap-5">
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
        <div className="absolute w-full h-screen bg-secondary text-primary top-0 opacity-75">
          <div className="flex items-center justify-center h-full ">
            <div className="bg-muted animate-pulse  p-6 rounded-md">
              <h2 className="text-center  text-sm">Getting Out...</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
