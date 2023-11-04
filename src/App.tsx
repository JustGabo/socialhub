import "./App.css";
import { Route, Routes } from "react-router-dom";

//importing context
import UserProvider from "./context/userContext";
import AccountProvider from "./context/accountContext";
import FollowContextProvider from "./context/followContext";
import { ThemeProvider } from "@/components/theme-provider";

//importing pages
import EditPage from "./pages/edit-profile";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import UserPage from "./pages/user";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CreateAccountPage from "./pages/create-account";
<<<<<<< HEAD
import UploadPage from './pages/upload'
import WatchPage from './pages/watching-pics'
import UserDetailsPage from './pages/userDetails'
import CommentsPage from './pages/comments'

function App() {

  // const navigate = useNavigate()


  return (
    <UserProvider>
      <AccountProvider>
        <FollowContextProvider>
          {" "}
          <div className="h-screen bg-secondary">
            <div className="">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/profile" element={<UserPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/create" element={<CreateAccountPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/userdetails/:username" element={<UserDetailsPage />} />
                <Route path="/edit" element={<EditPage />} />
                <Route path="/watch/:id" element={<WatchPage />} />
                <Route path="post/comments/:id" element={<CommentsPage />} />
              </Routes>
=======
import UploadPage from "./pages/upload";
import WatchPage from "./pages/watching-pics";
import UserDetailsPage from "./pages/userDetails";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <AccountProvider>
          <FollowContextProvider>
            {" "}
            <div className="h-screen bg-secondary">
              <div className="">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/profile" element={<UserPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/create" element={<CreateAccountPage />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route
                    path="/userdetails/:username"
                    element={<UserDetailsPage />}
                  />
                  <Route path="/edit" element={<EditPage />} />
                  <Route path="/watch" element={<WatchPage />} />
                </Routes>
              </div>
>>>>>>> 2a00a9d (feat: making some amends to errors)
            </div>
          </FollowContextProvider>
        </AccountProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
