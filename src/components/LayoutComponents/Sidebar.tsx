// import React from "react";
import { LProps } from "./LayoutProps";
import { NavLink } from "react-router-dom";

const LeftSidebar = ({ links }: LProps) => {
  return (
    <div
      className={`flex h-screen sticky top-0 max-lg:w-auto w-[20%] flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white pl-6`}
    >
      <div className="flex justify-between h-16 shrink-0 items-center pr-4">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        {/* icon to collapse the sidebar */}
      </div>
      <nav className="flex flex-1 flex-col pr-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-2">
              {links.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.target}
                    className={({ isActive }) =>
                      isActive
                        ? `bg-gray-50 text-indigo-600 group flex max-lg:justify-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`
                        : `text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex max-lg:justify-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`${
                            isActive
                              ? "text-indigo-600 h-6 w-6 shrink-0"
                              : "text-gray-400 group-hover:text-indigo-600 h-6 w-6 shrink-0"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <p className={`text-light-1 max-lg:hidden`}>
                          {item.title}
                        </p>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
