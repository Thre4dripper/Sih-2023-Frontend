import { Link } from "react-router-dom";
import CreateAccount from "../Register/Register";
import UserLogin from "../Login/Login";

const LandingPageNavbar = () => {
  return (
    <div className="w-full p-4 px-4 z-30 flex border-b border-border sticky top-0 bg-foreground">
      <CreateAccount />
      <UserLogin />
      LOGO/ICON
      <div className="flex gap-x-3 ml-auto">
        <Link
          className="bg-secondary text-gray-700 p-2 px-4 rounded-sm cursor-pointer hover:bg-secondary/90"
          to="/?modal=login"
        >
          Login
        </Link>
        <Link
          className="bg-primary p-2 px-4  rounded-sm cursor-pointer"
          to="/?modal=signup"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
