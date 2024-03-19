import { fetchUser } from "@/actions/dashboard";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const Userbar = async () => {
  const data = await fetchUser("user");
  return (
    <div className="w-full flex justify-end bg-gradient-to-r from-primary-700 to-secondary-700 p-5 text-white">
      <div className="group">
        <FaUserCircle className="text-white text-2xl hover:text-gray-100 cursor-pointer" />
        <div className="absolute right-2 group-hover:block hidden bg-gray-200 rounded-md text-black top-11 p-4">
          <Link href={"/dashboard/profile"}>
            <p className="cursor-pointer hover:bg-primary-700 hover:text-white px-2">
              {data.user.name}
            </p>
          </Link>
          <button className="text-black hover:bg-primary-700 hover:text-white w-full px-4">
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userbar;
