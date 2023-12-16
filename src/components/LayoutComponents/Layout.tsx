import {
  BookOpenCheck,
  BookPlus,
  LayoutDashboard,
  User2Icon,
  Users,
  Users2Icon,
} from "lucide-react";
import React from "react";
import Navbar from "./Navbar";
import LeftSidebar from "./Sidebar";

const links = [
  {
    title: "Dashboard",
    target: "/organization/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "All Proctors",
    target: "/organization/allProctors?page=1",
    icon: <Users />,
  },
  {
    title: "Exams",
    target: "/organization/exams?page=1",
    icon: <BookOpenCheck />,
  },
  {
    title: "Questions",
    target: "/organization/questions",
    icon: <BookPlus />,
  },
  {
    title: "Students",
    target: "/organization/students",
    icon: <Users2Icon />,
  },
];

// create sets of links for orgs, proctors and superadmin. Check the url for organization etc and if the role matches, the user can access the page.

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
