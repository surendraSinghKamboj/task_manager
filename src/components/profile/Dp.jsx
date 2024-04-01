import { FaUser, FaEdit } from "react-icons/fa";
import Image from "next/image";

import React from "react";

const Dp = ({photo,userId}) => {
  return (
    <div className="relative">
      {photo ? (
        <Image
          src={photo}
          width={128}
          height={128}
          className="rounded-full"
        />
      ) : (
        <FaUser className="text-9xl bg-secondary-400 rounded-full p-2" />
      )}
      <div className="absolute w-full h-16 bottom-0 left-0 bg-[#4645453d] rounded-b-full">
        <FaEdit className="text-white text-2xl cursor-pointer absolute z-40 left-1/2 bottom-4 -translate-x-1/2 hover:scale-105 hover:opacity-80 transition-all duration-500" />
      </div>
    </div>
  );
};

export default Dp;
