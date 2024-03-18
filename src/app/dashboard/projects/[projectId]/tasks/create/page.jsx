"use client";

import Option from "@/components/form/Option";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateTask = ({ params }) => {
  const [data, setData] = useState({});
  const router = useRouter();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/v1/tasks/create", {
        data,
        projectId: params.projectId,
      });
      if (response) {
        router.push(response.headers.location);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 p-4">
      {/* grid one */}
      <div className="flex flex-col justify-center items-center">
        <input
          onChange={handleChange}
          name="taskName"
          type="text"
          placeholder="Task Name"
          className="w-96 mb-2 border-2 h-9 px-2 focus:outline-none"
        />
        <Option
          onChange={handleChange}
          name={"type"}
          options={[
            "Task Type",
            "Developer Tasks",
            "Designer Tasks",
            "Creative Tasks",
          ]}
        />
        <textarea
          onChange={handleChange}
          name="description"
          cols="30"
          rows="10"
          className="w-96 mb-2 border-2 px-2 focus:outline-none"
        ></textarea>
        <Option
          onChange={handleChange}
          name={"status"}
          options={[
            "Not Assigned",
            "Assigned",
            "In Progress",
            "Completed",
            "Fixing",
            "Fixed",
          ]}
        />
        <button
          onClick={handleSubmit}
          className="px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-sm"
        >
          Create Task
        </button>
      </div>
      {/* grid two */}
      <div className=""></div>
    </div>
  );
};

export default CreateTask;
