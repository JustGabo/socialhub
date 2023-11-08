import { useState } from "react";
import { Settings, ChevronLeft, LogOut, Trash, Pencil } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components//mode-toggle";
import { UseContext } from "../context/userContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";

import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";

function ProfileMenu() {
  // usages
  const navigate = useNavigate();
  const [gettingOut, setGettingOut] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = UseContext();
  const [modal, setModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  //   functions
  const deletingAccount = async () => {
    const res = await supabase.from("usuario").delete().eq("id", user?.id);
    if (res.status == 204) {
      setModal(true);
      activatingModal();
    }
  };

  const activatingModal = () => {
    setTimeout(() => {
      setModal(false);
      signOut();
    }, 2000);
  };

  const signOut = async () => {
    const res = await supabase.auth.signOut();
    return res;
  };

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
          <SheetTrigger onClick={() => setOpen(true)} asChild>
            <Button className="p-0 bg-transparent">
              <Settings
                className="text-primary"
                width={20}
                height={20}
                strokeWidth={1.5}
              />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <div className="h-full">
              <div className="relative h-full">
                <Button className=" text-primary bg-transparent mt-5">
                  <Link to={"/edit"} className="flex gap-2 items-center">
                    <Pencil width={18} height={18} strokeWidth={1} />
                    <span className="text-sm ml-1">Edit</span>
                  </Link>
                </Button>

                <div className="mt-5"></div>

                <ul className="absolute bottom-10 text-primary flex flex-col gap-5">
                  <ModeToggle />

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
                  <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
                    <DialogContent className="w-[95%] text-primary bg-secondary h-72 py-4">
                      <DialogDescription className="py-10">
                        If you do this, all the content related to your account
                        and your account as well, will be deleted
                      </DialogDescription>
                      <Button
                        className="bg-red-500"
                        onClick={() => {
                          setOpenDialog(false);
                          setOpen(false);
                          deletingAccount()
                        }}
                      >
                        Delete
                      </Button>
                    </DialogContent>
                    <DialogTrigger onClick={()=> setOpenDialog(true)} asChild>
                      <Button
                        className="flex items-center text-red-500 bg-transparent text-sm"
                      >
                        <Trash width={20} height={20} strokeWidth={1} />
                        <span className="ml-2 text-sm">Delete Account</span>
                      </Button>
                    </DialogTrigger>
                  </Dialog>
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
              <h2 className="text-center text-secondary text-sm">
                Getting Out...
              </h2>
            </div>
          </div>
        </div>
      )}
      <div
        className={`shadow-lg p-4 absolute bottom-32 ${
          modal ? "opacity-100" : "opacity-0"
        } border transition-all duration-1000 border-primary/25 text-xs bg-secondary rounded-md right-0 z-10`}
      >
        Your account was deleted successfully
      </div>
    </div>
  );
}

export default ProfileMenu;
