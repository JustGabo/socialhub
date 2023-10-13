import { Home, Search, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function BottomBar() {
  const [select, setSelect] = useState("");

  return (
    <div className="fixed bottom-0 flex justify-between w-full px-6 py-3 border-t border-gray-400">
      <button onClick={() => setSelect("home")}>
        <Link to={"/"}>
          <Home color="#fff" strokeWidth={select == "home" ? 2 : 1} />
          
        </Link>
      </button>
      <button onClick={() => setSelect("search")}>
        <Link to={"search"}>
          <Search color="#fff" strokeWidth={select == "search" ? 2 : 1} />
        </Link>
      </button>
      <button onClick={() => setSelect("user")}>
        <Link to={"user"}>
          <User color="#fff" strokeWidth={select == "user" ? 2 : 1} />
        </Link>
      </button>
    </div>
  );
}

export default BottomBar;
