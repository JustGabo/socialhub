import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import {Button} from '../components/ui/button'
import {Input} from '../components/ui/input'

function CreateAccountForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { user } = UseContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await supabase
      .from("usuario")
      .insert({ id: user?.id, username: username });
    if (res) {
      navigate("/");
    }
  };

  const redirect = ()=>{
    if(user){
      navigate("/")
    }else{
      return
    }
  }

  const getUser = async () => {
    const res = await supabase.auth.getUser();
    console.log(res);
  };

  useEffect(() => {
    getUser();
    redirect()
  }, []);

  return (
    <div className="flex items-center justify-center text-primary h-screen px-4 py-6">
      <div className="w-full ">
        <h2 className="mb-10 text-xl font-medium text-center">
          Create Account
        </h2>
        <form
          action=""
          className="flex flex-col gap-4 px-4 w-[90%] m-auto text-sm"
        >
          <label htmlFor="username">Create Username</label>
          <Input
            className="p-2 rounded-md outline-none bg-transparent border border-primary text-xs"
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          {/* <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded-md outline-none bg-neutral-800"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="p-2 rounded-md outline-none bg-neutral-800"
            type="password"
            placeholder="Enter your password"
          /> */}
          <div className="flex items-center gap-2 text-xs">
            <p>Already have an account?</p>
            <p>
              <Link to={"/login"}>Sign In</Link>
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={username === ""}
            className="p-2 mt-2 rounded-md bg-muted text-white"
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountForm;
