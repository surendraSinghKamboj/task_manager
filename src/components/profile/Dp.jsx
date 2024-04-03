"use client";
import { FaUser, FaEdit } from "react-icons/fa";
import Image from "next/image";

import React, { useState } from "react";
import { saveFile } from "@/actions/files";
import { extractFileName } from "@/libs/extractFilename";

const Dp = ({ photo }) => {
  const [imageSrc, setImageSrc] = useState("");

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await saveFile(formData);
    console.log(res);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        handleUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="relative">
        {photo ? (
          <Image
            src={imageSrc ? imageSrc : "/profile/pic/" + extractFileName(photo)}
            width={128}
            height={128}
            alt="profile"
            className="rounded-full w-32 h-32"
          />
        ) : (
          <FaUser className="text-9xl bg-secondary-400 rounded-full p-2" />
        )}
        <div className="absolute w-full h-16 bottom-0 left-0 bg-[#4645453d] rounded-b-full">
          <label htmlFor="image">
            <FaEdit className="text-white text-2xl cursor-pointer absolute z-40 left-1/2 bottom-4 -translate-x-1/2 hover:scale-105 hover:opacity-80 transition-all duration-500" />
            <input
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jpeg, .webp"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default Dp;
