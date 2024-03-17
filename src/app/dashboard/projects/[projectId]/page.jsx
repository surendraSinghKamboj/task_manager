import { projectById } from "@/actions/project";
import React from "react";

const ProjectDetails = async ({ params: { projectId } }) => {
  const project = await projectById(projectId);
  
  return (
    <div className="rounded-lg shadow-md p-6 md:w-1/2 mx-auto w-full min-h-screen flex justify-center items-center">
      {project ? (
        <div className="bg-gray-100 ">
          <h2 className="text-2xl font-bold mb-4">{project.project.projectName}</h2>
          <p className="text-gray-700 mb-2">{project.project.description}</p>
          <p className="text-gray-700 mb-2">
            Tech Stack: {project.project.techStack.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">App Type: {project.project.appType}</p>
          <p className="text-gray-700 mb-2">
            Git Link:{" "}
            <a href={project.project.gitLink} target="_blank" className="text-blue-500">
              {project.project.gitLink}
            </a>
          </p>
          {project.project.uiLink && (
            <p className="text-gray-700 mb-2">
              UI Link:{" "}
              <a href={project.project.uiLink} target="_blank" className="text-blue-500">
                {project.project.uiLink}
              </a>
            </p>
          )}
          <p className="text-gray-700">Created By: {project.createdBy}</p>
          <p className="text-gray-500 text-sm mt-4">
            Created At: {new Date(project.project.createdAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>Project not found</p>
      )}
    </div>
  );
};

export default ProjectDetails;
