import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { UseContext } from "../context/userContext";

function Login() {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const navite = useNavigate();

  const handleSubmit = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: usuario.email,
      password: usuario.password,
    });
    if (data) {
      navite("/");
    } else {
      console.log(error?.message);
    }
  };

  const navigate = useNavigate()
  const {user} = UseContext()
  
  const redirect = ()=>{
    if(user){
      navigate("/")
    }else{
      return
    }
  }
  
    useEffect(()=>{
       redirect()
    },[user])

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
          <div className="flex items-center gap-2 text-xs">
            <p>Don't have an account?</p>
            <p>
              <Link to={"/register"}>Sign Up</Link>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="p-2 mt-2 rounded-md bg-neutral-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
