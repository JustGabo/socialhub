import Header from "../components/user-page-header";
import BotttomBar from "../components/bottom-bar";
import UserPosts from '../components/user-page-posts'
import ProfileMenu from '../components/profile-menu'

function User() {
  return (
    <div className="py-6 text-white flex flex-col overflow-x-hidden gap-5">
      <ProfileMenu />

      <Header />

      <UserPosts/>

      <BotttomBar />
    </div>
  );
}

export default User;
