import React from "react";
import LeftSidebar from "./Sidebar";
import { HomeIcon } from "lucide-react";
import Navbar from "./Navbar";
import { User2Icon } from "lucide-react";

const links = [
  { title: "Dashboard", target: "/", icon: <HomeIcon /> },
  { title: "Dashboard", target: "/kjk", icon: <HomeIcon /> },
  { title: "Dashboard", target: "/kjk", icon: <HomeIcon /> },
  // { title: "Dashboard", target: "/", icon: <HomeIcon /> },
  { title: "Dashboard", target: "/kjk", icon: <HomeIcon /> },
  { title: "Dashboard", target: "/kjk", icon: <HomeIcon /> },
];

const User = {
  name: "Bilal Sajid",
  email: "bsajid173@gmaail.com",
  links: [
    {
      title: "Account",
      target: "/account",
      icon: <User2Icon />,
    },
    {
      title: "Account",
      target: "/account",
      icon: <User2Icon />,
    },
  ],
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[100vh]">
      <LeftSidebar links={links} />
      <div className="grow">
        <Navbar email={User.email} name={User.name} links={User.links} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
