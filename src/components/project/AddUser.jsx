"use client";

import { makeRequest } from "@/actions/request";
import { searchUsers } from "@/actions/users";
import React, { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

const AddUser = ({ projectId }) => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  // const [reqStatus, setReqStatus] = useState({ status: false, message: "" });

  const showToastMessage = (reqStatus) => {
    if (reqStatus.status) {
      toast.info(reqStatus.message);
    } else {
      toast.error(reqStatus.message);
    }
  };

  const handleRequest = async (userId) => {
    try {
      const response = await makeRequest({ projectId, userId });
      if (!response) {
        showToastMessage({
          status: false,
          message: "Client Side Error.",
        });
      }

      showToastMessage(JSON.parse(response));
    } catch (error) {
      console.log(error);
      showToastMessage({
        status: false,
        message: "Check your Internet Connection",
      });
    }
  };

  useEffect(() => {
    let timeoutId;

    const fetchUsers = async () => {
      try {
        const users = await searchUsers({ query: input });
        console.log(users);
        setData(JSON.parse(users));
      } catch (error) {
        console.error("Error fetching users:", error);
        setData([]);
      }
    };

    if (input && input.length >= 3) {
      // Clear the previous timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      // Set a new timeout to delay fetching users
      timeoutId = setTimeout(fetchUsers, 600); // Adjust the delay as needed (e.g., 300 milliseconds)
    } else {
      // If input is empty or less than 3 characters, clear the data
      setData([]);
    }

    // Clean up function to clear timeout on unmount or input change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [input]);

  return (
    <div className="mt-4 ml-4 group max-w-fit">
      <ToastContainer />
      <IoMdPersonAdd className="text-3xl text-secondary-600 hover:scale-110 transition-all duration-700 cursor-pointer" />

      <form className="hidden group-hover:block absolute z-20">
        <input
          type="email"
          name="user"
          placeholder="Enter Email..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "calc(100% - 4px)",
            height: "2.25rem",
            padding: "0.5rem",
            marginTop: "0.5rem",
            borderWidth: "2px",
            borderColor: "#ccc",
            placeholderColor: "#ccc",
          }}
        />
        {data &&
          data.map((item) => (
            <div
              onClick={() => handleRequest(item._id)}
              key={item._id}
              className="flex flex-col bg-secondary-200 hover:bg-primary-600 cursor-pointer hover:text-white px-2 justify-center items-start"
            >
              <p>{item.name}</p>
              <p className="text-sm text-secondary-500">{item.email}</p>
            </div>
          ))}
      </form>
    </div>
  );
};

export default AddUser;
