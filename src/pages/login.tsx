import React, { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navite = useNavigate();

  const handleSubmit = async () => {
    const { data,error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if(data){
      navite('/')
  }else{
    console.log(error?.message)
  }
}


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full text-white">
        <h2 className="mb-10 text-xl font-medium text-center">
          Log into your account
        </h2>
        <form
          action=""
          className="flex flex-col gap-4 px-4 w-[90%] m-auto text-sm"
        >
          <label htmlFor="email">Email</label>
          <input
            className="p-2 rounded-md outline-none bg-neutral-800"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="p-2 rounded-md outline-none bg-neutral-800"
            type="password"
            placeholder="Enter your password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button onClick={(e)=>{
            e.preventDefault()
            handleSubmit()
          }} className="p-2 mt-2 rounded-md bg-neutral-800">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
