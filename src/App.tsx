import { useState } from "react";
import "./App.css";
import {  Route, Routes } from "react-router-dom";

//importing components
import BotttomBar from "./components/bottom-bar";

//importing pages
import HomePage from "./pages/home";
import SearchPage from './pages/search'
import UserPage from './pages/user'

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen bg-black">
      <div className="px-4 py-6 ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/user" element={<UserPage/>} />
          </Routes>
      </div>
      <BotttomBar />
    </div>
  );
}

export default App;
