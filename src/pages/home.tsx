import { useEffect } from "react";
import BotttomBar from "../components/bottom-bar";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import { supabase } from "../supabase/client";

function Home() {
  const navigate = useNavigate();
  const { user } = UseContext();

  const redirect = () => {
    if (!user) {
      navigate("/login");
    } else {
      return;
    }
  };

  const signOut = async () => {
    const data = await supabase.auth.signOut();
    return data;
  };



  useEffect(() => {
    redirect();
  }, [user]);

  return (
    <div className="py-6 text-white ">
      <main className="px-4">
        <div className="py-5">
          <h1 className="text-3xl font-bold">SocialHub</h1>
        </div>
      </main>

      <button
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        sign out
      </button>

      <BotttomBar />
    </div>
  );
}

export default Home;
