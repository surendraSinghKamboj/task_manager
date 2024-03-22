"use client";
import React from "react";
import { useState } from "react";

const AddUsers = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {};

  return (
    <div className="container mx-auto flex mt-2 flex-col justify-center border-b-2 pb-2 border-secondary-500 items-center relative">
      <h5 className="text-secondary-900">Add Coloborator</h5>
      <div className="flex justify-center items-center sm:flex-row flex-col">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Enter email"
          className="w-56 sm:w-96 border-gray-400 border focus:outline-1 focus:outline-secondary-500 px-2 py-1 rounded-lg"
        />

      </div>
    </div>
  );
};

export default AddUsers;
