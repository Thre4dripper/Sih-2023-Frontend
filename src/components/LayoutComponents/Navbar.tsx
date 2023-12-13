// import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NProps } from "./LayoutProps";
import { ArrowRightFromLine } from "lucide-react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { sidebarState } from "@/atoms/sidebarState";

const Navbar = ({ email, name, links }: NProps) => {
  const setSidebarHidden = useSetRecoilState(sidebarState);
  const isHidden = useRecoilValue(sidebarState);

  return (
    <div className="w-full p-4 px-4 flex border-b border-gray-200">
      <div className="flex items-center">
        <span
          onClick={() =>
            setSidebarHidden((_prev) => {
              return { isHidden: false };
            })
          }
          className={` rounded-sm p-2 ${
            !isHidden?.isHidden ? "hidden" : ""
          } max-lg:block hover:bg-gray-50 cursor-pointer`}
        >
          <ArrowRightFromLine className={`text-gray-700`} />
        </span>
      </div>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuLabel>{email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links?.map((item) => {
                return (
                  <DropdownMenuItem>
                    <Link to={item.target}>
                      <span className="flex gap-x-2">
                        {item.icon}
                        {item.title}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
