import { Link } from "react-router-dom";
import CreateAccount from "../Register/Register";

const LandingPageNavbar = () => {
  return (
    <div className="w-full p-4 px-4 z-30 flex border-b border-gray-200 sticky top-0 bg-white">
      <CreateAccount />
      LOGO/ICON
      <div className="flex gap-x-3 ml-auto">
        <Link
          className="bg-indigo-100 text-gray-700 p-2 px-4 rounded-sm cursor-pointer hover:bg-indigo-200"
          to="/?modal=login"
        >
          Login
        </Link>
        <Link
          className="bg-indigo-600 p-2 px-4 text-white rounded-sm cursor-pointer"
          to="/?modal=signup"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
