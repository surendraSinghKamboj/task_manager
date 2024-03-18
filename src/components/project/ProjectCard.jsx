import React from "react";
import Link from 'next/link'

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-96 m-4">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.projectName}</h3>
        <p className="text-gray-700 text-base mb-4">{project.description}</p>
        <div className="flex flex-wrap mb-4">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
        <p className="text-gray-700 text-sm mb-4">
          App Type: {project.appType}
        </p>
        <div className="flex mb-4">
          <a
            href={project.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2"
          >
            GitHub
          </a>
          <a
            href={project.uiLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
          >
            UI Link
          </a>
        </div>
        <p className="text-gray-600 text-sm">Created By: {project.createdBy}</p>
        <p className="text-gray-600 text-sm">
          Created At: {new Date(project.createdAt).toLocaleString()}
        </p>
        <p className="text-gray-600 text-sm">
          Updated At: {new Date(project.updatedAt).toLocaleString()}
        </p>
      </div>
      <Link href={`/dashboard/projects/${project._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2">
          Open
        </button>
      </Link>
    </div>
  );
};

export default ProjectCard;
