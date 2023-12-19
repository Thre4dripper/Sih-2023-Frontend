import { LayoutDashboard, Users } from "lucide-react";
import ProfileSidebar from "./profileSidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      title: "Dashboard",
      target: "/organization/account/profile",
      icon: <LayoutDashboard />,
    },
    // {
    //   title: "All Proctors",
    //   target: "/organization/allProctors?page=1",
    //   icon: <Users />,
    // },
    // {
    //   title: "Exams",
    //   target: "/organization/exams?page=1",
    //   icon: <BookOpenCheck />,
    // },
    // {
    //   title: "Questions",
    //   target: "/organization/questions",
    //   icon: <BookPlus />,
    // },
    // {
    //   title: "Students",
    //   target: "/organization/students",
    //   icon: <Users2Icon />,
    // },
  ];
  return (
    <div className="flex min-h-[100vh]">
      <ProfileSidebar links={links} />
      <div className="grow">{children}</div>
    </div>
  );
};

export default ProfileLayout;
