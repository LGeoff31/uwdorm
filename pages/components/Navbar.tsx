import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white">
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
        <div className="text-med w-full md:block md:w-auto md:bg-white">
                        <ul className="font-medium flex flex-col p-3 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            <li><a href="/dorms" className="hover:text-blue-600">Dorms</a></li>
                            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
                        </ul>
                    </div>
      </div>
    </nav>
  );
};

export default Navbar;
