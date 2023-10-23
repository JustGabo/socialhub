import { Home, Search, User, PlusSquare } from "lucide-react";
import  { useState, useEffect } from "react";
import { useLocation,useNavigate} from "react-router-dom";

function BottomBar() {
  const [select, setSelect] = useState("home");
  const { pathname } = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
    setSelect(pathname.replace("/", "") || "home");
  }, [pathname]);

  return (
    <div className="fixed bottom-0 flex justify-between w-full px-6 py-3 border-t border-gray-600">
      <button onClick={()=> navigate('/')}>
          <Home color="#ddd" strokeWidth={select == "home" ? 2 : 1} />
      </button>
      <button onClick={()=> navigate('/search')}>
          <Search color="#ddd" strokeWidth={select == "search" ? 2 : 1} />
      </button>
      <button onClick={()=> navigate('/upload')}>
          <PlusSquare color="#ddd" strokeWidth={select == "upload" ? 2 : 1} />
      </button>
      <button onClick={()=> navigate('/user')}>
          <User color="#ddd" strokeWidth={select == "user" ? 2 : 1} />
      </button>
    </div>
  );
}

export default BottomBar;

// const windowRoute = window.location.pathname;

// useEffect(() => {
//   if (window.location.pathname == "/") {
//     return setSelect("home");
//   }else if(window.location.pathname == "/search"){
//     return setSelect("search")
//   }else if (window.location.pathname == "/user"){
//     return setSelect("user")
//   }else{
//     return console.log("none")
//   }
// }, [windowRoute])
