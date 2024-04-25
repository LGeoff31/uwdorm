import React from "react";
import { Stack, Typography } from "@mui/material";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="index.html"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img className="h-30 w-20" src={"./logo.png"} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            UW Dorms
          </span>
        </a>
        <div className="text-med hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-3  mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <a href="index.html" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="index.html" className="hover:text-blue-600">
                See Dorms
              </a>
            </li>
            <li>
              <a href="index.html" className="hover:text-blue-600">
                Rate Dorm
              </a>
            </li>
            <li>
              <a href="index.html" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="index.html" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
