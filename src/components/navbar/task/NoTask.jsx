import React from "react";
import Link from "next/link";

const NoTask = ({ projectId }) => {
  return (
    <div className="container mx-auto min-h-96 flex flex-col justify-center items-center bg-gray-100 rounded-md shadow shadow-gray-100">
      <p>There no found any task Please create a new task</p>
      <Link href={`/dashboard/projects/${projectId}/tasks/create`}>
        <button className="px-2 mt-2 py-1 bg-primary-600 text-white hover:opacity-80 transition-all duration-500 rounded-md">Create Task</button>
      </Link>
    </div>
  );
};

export default NoTask;
