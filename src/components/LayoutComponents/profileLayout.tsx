import { BookOpenCheck, BookPlus, CircleUserRound, Users } from "lucide-react";
import ProfileSidebar from "./profileSidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      title: "Profile",
      target: "/student/account/profile",
      icon: <CircleUserRound />,
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
  ];
  return (
    <div className="flex min-h-[100vh]">
      <ProfileSidebar links={links} />
      <div className="grow px-12 py-8 bg-secondary">{children}</div>
    </div>
  );
};

export default ProfileLayout;
