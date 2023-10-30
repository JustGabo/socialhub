import { useState, useCallback, useEffect } from "react";
import { supabase } from "../supabase/client";
import { ChevronLeft, Pencil, Target, UserCircle2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { UseContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { UsingAccountContext } from "../context/accountContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function EditProfileForm() {
  // usages
  const [file, setFile] = useState<File | null>(null);
  const { user } = UseContext();
  const { account } = UsingAccountContext();
  const [name, setName] = useState<string>(() => account.username || "");
  const [imageUrl, setImageUrl] = useState<string>(() => account.image || "");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    if (!account) return;


    setImageUrl(account.image || "");
    setName(account.username || "");
  }, [account]);

  // functions

  const settingSupabase = async (imageUrl: string) => {
    const res = await supabase
      .from("usuario")
      .update({ username: name, image: imageUrl })
      .eq("id", user?.id);
    console.log(res);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const applyChanges = async () => {
    const url = await changingImage();
    await settingSupabase(url!);
  };

  const changingImage = async () => {
    if (!file) return;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`/profile/image_${user?.id}`, file, { upsert: true });
    if (error) {
      console.log(error);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(data.path);

    setImageUrl(publicUrl);

    return publicUrl;

    // const res = await supabase
    //   .from("usuario")
    //   .update({ image: url })
    //   .eq("id", user?.id);
    // console.log(res);
  };

  return (
    <div className="text-primary w-[95%] m-auto grid gap-5">
      <div>
        <Link to={"/profile"}>
          <ChevronLeft />
        </Link>
      </div>
      <h2 className="text-2xl text-center font-light">Edit Profile</h2>
      <section className="flex items-center flex-col justify-center gap-2">
        {account.image ? (
          <div className="">
            <img
              className="w-[25%] rounded-full m-auto aspect-square object-cover"
              src={account.image}
            />
          </div>
        ) : (
          <div>
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                className="w-[25%] rounded-full m-auto aspect-square object-cover"
                alt=""
              />
            ) : (
              <UserCircle2 width={100} height={100} strokeWidth={0.5} />
            )}
          </div>
        )}

        <div className="relative">
          <div
            {...getRootProps()}
            className="text-xs absolute text-secondary bottom-4 left-4 bg-blue-600 w-8 aspect-square  flex justify-center items-center  rounded-full "
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
            value={name}
            onChange={(e) => {
              handleChange(e);
            }}
            className="px-4 py-2 bg-transparent text-primary border border-primary placeholder:text-primary rounded-md outline-none"
            autoComplete="off"
            id="username"
            type="text"
            placeholder={'Change username'}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              applyChanges();
            }}
            className={` ${
              name == "" && file == null ? "bg-neutral-700" : "bg-blue-600"
            }`}
          >
            Apply
          </Button>
        </form>
      </section>
    </div>
  );
}

export default EditProfileForm;
