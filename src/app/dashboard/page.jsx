import { fetchUser } from "@/actions/dashboard";
import ProjectCard from "@/components/project/ProjectCard";
import React from "react";

const Page = async () => {
  const data = await fetchUser();
  return (
    <div className="w-full p-4">
      <p>You have {data.projectsNumber} Projects.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {data.projects &&
          data.projects.map((project) => (
            <div key={project._id}>
              <ProjectCard project={project} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
