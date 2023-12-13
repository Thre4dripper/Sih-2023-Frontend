import React from "react";
import LeftSidebar from "./Sidebar";
import { HomeIcon } from "lucide-react";

const links = [
  { title: "Dashboard", target: "/", icon: <HomeIcon /> },
  { title: "Dashboard", target: "/kjk", icon: <HomeIcon /> },
  { title: "Dashboard", target: "/kjk", icon: <HomeIcon /> },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[100vh]">
      <LeftSidebar links={links} />
      <div className="grow">{children}</div>
    </div>
  );
};

export default Layout;
