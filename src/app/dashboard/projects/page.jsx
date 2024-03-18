import { fetchAllProjects } from "@/actions/project";
import ProjectCard from "@/components/project/ProjectCard";
import React from "react";

const Project = async () => {
  const projects = await fetchAllProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default Project;
