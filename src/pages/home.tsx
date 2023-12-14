import { useEffect } from "react";
import BotttomBar from "../components/bottom-bar";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import HomePosts from "../components/home-posts";
// import Logo from '../../public/2.png';

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
    <div className="py-6 text-primary bg-secondary">
      <main className="px-4 mb-10">
        <div className="pt-10  flex items-center justify-center">
          {/* <img className="p-0 h-min" src={Logo} alt="" /> */}
          <strong className="text-4xl ">SocialHub</strong>
        </div>
      </main>

      <HomePosts />

      <BotttomBar />
    </div>
  );
}

export default Home;
