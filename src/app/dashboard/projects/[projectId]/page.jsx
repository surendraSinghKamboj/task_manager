import { projectById } from "@/actions/project";
import React from "react";
import Link from "next/link";


//  --------------------------------------------------------------------------------------------
/*
{
  project: {
    _id: new ObjectId('65f79775b96a13627df2cd94'),
    projectName: 'Augse Backend',
    description: 'Augse backend Developed in Node.js',
    techStack: [ 'NodeJs', ' Mongodb', ' Phonepe' ],
    appType: 'Web App',
    gitLink: 'https://github.com/indianventuresdb/dot_backend',
    uiLink: 'https://figmalink.com',
    createdAt: 2024-03-18T01:23:01.363Z,
    updatedAt: 2024-03-18T01:23:01.363Z,
    __v: 0
  },
  createdBy: 'Surendra Singh kamboj',
  tasks: []
}
*/
//  --------------------------------------------------------------------------------------------  


const ProjectDetails = async ({ params: { projectId } }) => {
  const data = await projectById(projectId);

  const { project, createdBy, tasks } = data;

  return !data ? (
    <div className="w-full h-screen flex justify-center items-center">
      <h6>No Project Found</h6>
    </div>
  ) : (
    <div className="w-full p-4">
      <div className="flex flex-col p-2">
        <h3 className="text-2xl font-semibold">{project.projectName}</h3>

        <p>{project.description}</p>
        <div className="flex gap-2">
        {
          project.techStack && project.techStack.map((tech,index)=><button key={index} className="px-4 py-1 bg-gray-500 text-white text-sm rounded-full">{tech}</button>)
        }
        </div>
        
      </div>
    </div>
  );
};

export default ProjectDetails;
