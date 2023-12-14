import { Link } from "react-router-dom";
import CreateAccount from "../Register/Register";
import UserLogin from "../Login/Login";
import { Button } from "../ui/button";

const LandingPageNavbar = () => {
  return (
    <div className="w-full p-4 px-4 z-30 flex border-b border-border sticky top-0 bg-foreground">
      <CreateAccount />
      <UserLogin />
      LOGO/ICON
      <div className="flex gap-x-3 ml-auto">
        <Link className="" to="/?modal=login">
          <Button variant={"default"}>Login</Button>
        </Link>
        <Link
          className="bg-primary p-2 px-4 text-white rounded-sm cursor-pointer"
          to="/?modal=signup"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
