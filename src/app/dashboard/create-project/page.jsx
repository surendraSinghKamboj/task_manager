"use client";

import React, { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: "",
    appType: "",
    gitLink: "",
    uiLink: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/projects/create", {
        formData,
      });
    } catch (error) {}
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 md:w-1/2 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-gray-700 font-bold mb-2"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="techStack"
            className="block text-gray-700 font-bold mb-2"
          >
            Tech Stack (comma separated)
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="appType"
            className="block text-gray-700 font-bold mb-2"
          >
            App Type
          </label>
          <select
            id="appType"
            name="appType"
            value={formData.appType}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select App Type</option>
            <option value="Web App">Web App</option>
            <option value="Android App">Android App</option>
            <option value="IOS App">IOS App</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="gitLink"
            className="block text-gray-700 font-bold mb-2"
          >
            Git Link
          </label>
          <input
            type="text"
            id="gitLink"
            name="gitLink"
            value={formData.gitLink}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="uiLink"
            className="block text-gray-700 font-bold mb-2"
          >
            UI Link
          </label>
          <input
            type="text"
            id="uiLink"
            name="uiLink"
            value={formData.uiLink}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
