import { useState, useCallback } from "react";
import { supabase } from "../supabase/client";
import { ChevronLeft, Pencil, UserCircle2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { UseContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { UsingAccountContext } from "../context/accountContext";
import { Input } from "../components/ui/input";
import {Button} from '../components/ui/button'

function EditProfileForm() {
  // usages
  const [file, setFile] = useState<File | null>(null);
  const { user } = UseContext();
  const { account } = UsingAccountContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // functions

  const changingImage = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`/profile/image_${user?.id}`, file);
    if (error) {
      console.log(error);
      return;
    }

    const url = supabase.storage
      .from("images")
      .getPublicUrl(`/profile/images_${user?.id}`);

    const res = await supabase
      .from("usuario")
      .update({ image: url })
      .eq("id", user?.id);
    console.log(res);
  };

  return (
    <div className="text-secondary w-[95%] m-auto grid gap-5">
      <div>
        <Link to={"/profile"}>
          <ChevronLeft />
        </Link>
      </div>
      <h2 className="text-2xl text-center ">Edit Profile</h2>
      <section className="flex items-center flex-col justify-center gap-2">
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            className="w-[25%] rounded-full aspect-square object-cover"
            alt=""
          />
        ) : (
          <UserCircle2 width={100} height={100} strokeWidth={0.5} />
        )}
        <div className="relative">
          <div
            {...getRootProps()}
            className="text-xs absolute bottom-4 left-4 bg-blue-600 w-8 aspect-square  flex justify-center items-center  rounded-full "
          >
            <input {...getInputProps()} />
            <Pencil width={20} height={20} strokeWidth={1} />
          </div>
        </div>
      </section>
      <section>
        <form action="" className="flex flex-col gap-3 text-sm">
          <label htmlFor="username" className="text-base">
            Username
          </label>
          <Input
            className="px-4 py-2 bg-primary border border-gray-600 rounded-md outline-none"
            autoComplete="off"
            id="username"
            type="text"
            placeholder={account.username || undefined}
          />
          <Button className={``}>Apply</Button>
        </form>
      </section>
    </div>
  );
}

export default EditProfileForm;
