import { userState } from "@/atoms/userState";
import React from "react";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";

type TProtectedProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedProps) => {
  const user = useRecoilValue(userState);
  const location = useLocation();

  console.log(location?.pathname?.split("/"));

  if (
    location?.pathname?.split("/")[1] !== "" &&
    user?.role !== "" &&
    user?.role !== location?.pathname?.split("/")[1]
  )
    return;

  return children;
};

export default ProtectedRoute;
