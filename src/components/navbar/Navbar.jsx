import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="min-h-screen max-h-screen bg-gradient-to-b from-primary-700 to-secondary-700 text-white p-4">
      <h1 className="text-lg sm:text-3xl font-semibold mb-4">
        <Link href={"/dashboard"}>Dashboard</Link>
      </h1>
      <hr className="border-b border-white border-opacity-25 mb-4" />
      <ul className="space-y-4">
        <Link href={`/dashboard/create-project`}>
          <li className="hover:text-primary-800 hover:bg-white p-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
            Create Project
          </li>
        </Link>
        <Link href={`/dashboard/projects`}>
          <li className="hover:text-primary-800 hover:bg-white p-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
            Projects
          </li>
        </Link>
        <Link href={`/dashboard/users`}>
          <li className="hover:text-primary-800 hover:bg-white p-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
            Users
          </li>
        </Link>
        <Link href={`/dashboard/setting`}>
          {" "}
          <li className="hover:text-primary-800 hover:bg-white p-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
            Setting
          </li>
        </Link>{" "}
        <Link href={`/contact`}>
          <li className="hover:text-primary-800 hover:bg-white p-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
            Contact
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
