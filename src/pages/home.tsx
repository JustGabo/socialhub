import { useEffect } from "react";
import BotttomBar from "../components/bottom-bar";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import HomePosts from "../components/home-posts";

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

  useEffect(() => {
    redirect();
  }, [user]);

  return (
    <div className="py-6 text-primary">
      <main className="px-4 mb-10">
        <div className="py-5">
          <h1 className="text-3xl font-bold">SocialHub</h1>
        </div>
      </main>

      <HomePosts />

      <BotttomBar />
    </div>
  );
}

export default Home;
