import "./App.css";
import { Route, Routes } from "react-router-dom";

//importing context
import UserProvider from "./context/userContext";
import AccountProvider from "./context/accountContext";
import FollowContextProvider from "./context/followContext";

//importing pages
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CreateAccount from "./pages/create-account";

function App() {
  return (
    <UserProvider>
      <AccountProvider>
        <FollowContextProvider>
          {" "}
          <div className="h-screen bg-black">
            <div className="">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create" element={<CreateAccount />} />
              </Routes>
            </div>
          </div>
        </FollowContextProvider>
      </AccountProvider>
    </UserProvider>
  );
}

export default App;
