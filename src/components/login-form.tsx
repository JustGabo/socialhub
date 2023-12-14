import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { UseContext } from "../context/userContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Logo from "../../public/3.png";

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

  const navigate = useNavigate();
  const { user } = UseContext();

  const redirect = () => {
    if (user) {
      navigate("/");
    } else {
      return;
    }
  };

  useEffect(() => {
    redirect();
  }, [user]);

  return (
    <div className="flex items-center justify-center text-primary h-screen">
      <div className="w-full ">
        <div className="p-2 ">
          <img src={Logo} className="w-full  m-auto object-cover h-32" alt="" />
        </div>
        <section className="flex items-center justify-center mb-10">
          <div className="h-[0.5px] w-full bg-muted"></div>
          <h2 className=" text-sm  font-medium  text-center">LogIn</h2>
          <div className="h-[0.5px] w-full bg-muted"></div>
        </section>
        <form
          action=""
          className="flex flex-col gap-4 px-4 w-[90%] m-auto text-sm"
        >
          <label htmlFor="email">Email</label>
          <Input
            className="p-2 rounded-md outline-none bg-transparent border text-xs border-primary"
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            className="p-2 rounded-md outline-none bg-transparent border text-xs border-primary"
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
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={usuario.email === "" || usuario.password === ""}
            className="p-2 mt-2 rounded-md outline-none bg-primary text-secondary"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
