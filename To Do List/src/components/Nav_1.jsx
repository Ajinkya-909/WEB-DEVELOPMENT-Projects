import React from "react";

const Nav_1 = () => {
  return (
    <div className="bg-cyan-950 flex items-center h-12  w-full">
      <nav className="flex justify-around items-center w-full">
        <p className="font-bold text-xl m-1 text-cyan-300">React Project</p>
        <ul className="flex gap-4 m-1 justify-around">
          <li className="list-none text-white cursor-pointer hover:underline">
            Home
          </li>
          <li className="list-none text-white cursor-pointer hover:underline">
            About
          </li>
          <li className="list-none text-white cursor-pointer hover:underline">
            Contact
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav_1;
