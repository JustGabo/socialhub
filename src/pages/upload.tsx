import { useCallback, useState } from "react";
import BottomBar from "../components/bottom-bar";
import { useDropzone } from "react-dropzone";
import { supabase } from "../supabase/client";
import { UseContext } from "../context/userContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function Upload() {
  // states and usses
  const [file, setFile] = useState<File | null>(null);
  const { user } = UseContext();
  const [caption, setCaption] = useState("");

  // functions and fetchs

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
  }, []);

  const settingCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const addingPicture = async () => {
    if (!file) return alert("No file");

    // path - path
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`img-${Date.now ()}`, file);

    if (error) {
      console.log(error);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(data?.path);

    const res = await supabase
      .from("posts")
      .insert({ url: publicUrl, posterId: user?.id, caption });
    
      console.log(res);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="h-screen py-6 text-white">
      <div className="px-4 ">
        <h2 className="text-2xl text-center">Upload a photo</h2>

        <main className="flex flex-col h-full gap-10 pt-10">
          <section className="flex flex-col gap-3">
            {!file ? (
              <div className="w-full rounded-md h-[250px] bg-neutral-900 "></div>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="w-full h-[250px] object-cover rounded-md"
              />
            )}
            <div
              {...getRootProps()}
              className="w-full bg-neutral-900 rounded-md flex items-center justify-center h-[50px] "
            >
              <input {...getInputProps()} />

              <h2 className="text-sm text-neutral-400">
                Click to select from your gallery device
              </h2>
            </div>
          </section>
          <section>
            <form action="" className="flex flex-col gap-4">
              <label htmlFor="caption">Add a caption</label>
              <Input
                onChange={(e) => settingCaption(e)}
                type="text"
                className="px-4 py-2 text-sm bg-transparent border rounded-md outline-none border-neutral-700"
                placeholder="Write something"
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  addingPicture();
                }}
                className="w-full h-[40px] bg-blue-500 rounded-md"
              >
                Post
              </Button>
            </form>
          </section>
        </main>
      </div>
      <BottomBar />
    </div>
  );
}

export default Upload;
