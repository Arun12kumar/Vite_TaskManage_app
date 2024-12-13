import { User } from "../models/user";

interface NavbarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const Navbar = ({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavbarProps) => {
  return (
    <div className="w-screen h-[8vh] bg-blue-500 flex flex-row justify-center sm:justify-between items-center pl-8 pr-8">
      {/* App Title */}
      <div className="hidden sm:block">
        <p className="drop-shadow-lg text-slate-50 font-bold">Task Manage App</p>
      </div>

      {/* Button Section */}
      <div className="flex flex-row gap-8">
        {loggedInUser ? (
          <>
            {/* Logout Button */}
            <div className="flex items-center gap-5">
              <p>{loggedInUser.username}</p>
              <button
                className="bg-orange-400 text-white w-20 h-8 rounded-full"
                onClick={onLogoutSuccessful}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* SignUp Button */}
            <div>
              <button
                className="bg-orange-400 text-white w-20 h-8 rounded-full"
                onClick={onSignUpClicked}
              >
                SignUp
              </button>
            </div>

            {/* Login Button */}
            <div>
              <button
                className="bg-white text-blue-500 border border-blue-500 w-20 h-8 rounded-full"
                onClick={onLoginClicked}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
