import { useEffect } from "react";
import { UsingAccountContext } from "../context/accountContext";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/userContext";
import { UsingFollowContext } from "../context/followContext";
import { UserCircle2 } from "lucide-react";

function UserPageHeader() {
  const { account} = UsingAccountContext();
  const { user } = UseContext();
  const { followers, following } = UsingFollowContext();

  const navigate = useNavigate();

  // functions

  const redirect = () => {
    if (!user) {
      navigate("/login");
    } else {
      return;
    }
  };


  // useeffects

  useEffect(() => {
    redirect();
    console.log(user);
  }, [user]);

  return (
    <div>
      {account? (
        <div className="px-4 text-white">
          <header className="flex flex-col items-center gap-3">
            {account.image ? (
              <img
                className="w-[25%] aspect-square object-cover rounded-full"
                src={account.image}
                alt=""
              />
            ) : (
              <UserCircle2 width="25%" height="25%" strokeWidth={0.5} />
            )}

            <h2>{account.username}</h2>
            <div className="flex justify-between w-[75%]">
              <div className="text-center">
                <h3 className="text-sm font-semibold">Followers</h3>
                <p className="text-xs">{followers}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-semibold">Post</h3>
                <p className="text-xs">23</p>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-semibold">Following</h3>
                <p className="text-xs">{following}</p>
              </div>
            </div>
          </header>
        </div>
      ) : (
        <h2>Waiting</h2>
      )}
    </div>
  );
}

export default UserPageHeader;
