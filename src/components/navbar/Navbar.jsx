import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="min-h-screen max-h-screen bg-gradient-to-r from-purple-700 to-blue-500 text-white p-4">
      <h1 className="text-lg sm:text-3xl font-semibold mb-4"><Link href={"/dashboard"}>Dashboard</Link></h1>
      <hr className="border-b border-white border-opacity-25 mb-4" />
      <ul className="space-y-4">
        <li className="hover:text-purple-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
          <Link href={`/dashboard/create-project`}>Create Project</Link>
        </li>
        <li className="hover:text-purple-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
          <Link href={`/dashboard/projects`}>Projects</Link>
        </li>
        <li className="hover:text-purple-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
          <Link href={`/dashboard/users`}>Users</Link>
        </li>
        <li className="hover:text-purple-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
          <Link href={`/dashboard/setting`}>Setting</Link>
        </li>
        <li className="hover:text-purple-200 cursor-pointer transition-all duration-300 transform hover:scale-105">
          <Link href={`/contact`}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
