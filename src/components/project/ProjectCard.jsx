import React from "react";
import Link from "next/link";

const ProjectCard = ({ project:{_id,projectName,techStack,appType,gitLink,uiLink,createdBy:{name},createdAt} }) => {
  //--------------------------------------------------------- dataType-------------------------------------------------------------
  /**
   *                                               {
   *                                               _id: new ObjectId('65f71d6fa3dadd2dc61f47f0'),
   *                                               projectName: 'Augse frontend Project',
   *                                               description: 'Augse front end project',
   *                                               techStack: [ 'NextJS', 'NodeJs', 'MongoDb', 'Tailwind CSS' ],
   *                                               appType: 'Web App',
   *                                               gitLink: 'https://github.com/indianventuresdb/dot-frontend-client',
   *                                               uiLink: 'https://figmalink.com',
   *                                               createdBy: {
   *                                                 _id: new ObjectId('65f6a968c4a39d7a8196a9b7'),
   *                                                 name: 'John Doe'
   *                                               },
   *                                               createdAt: 2024-03-17T16:42:23.424Z,
   *                                               updatedAt: 2024-03-17T16:42:23.424Z,
   *                                               __v: 0
   *                                               }
   */
  //---------------------------------------------------------------------------------------------------------------------------------
  return <div className="w-96 h-96 relative hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all duration-500 flex flex-col rounded-lg">
      <h3 className="text-center mt-2">{projectName}</h3>
      <div className="w-full text-center bg-primary-500 cursor-pointer text-white mt-2">{appType}</div>
      <div className="flex flex-wrap">{techStack && techStack.map((tech,index)=><div key={index} className="bg-gray-400 text-white m-2 px-2 rounded-full cursor-pointer py-1">{tech}</div>)}</div>
      <div className="absolute bottom-2 left-2 text-gray-400">Created By: {name}</div>
      <div className="gird gird-cols-3 w-full absolute bottom-12 px-2">
        <a href={gitLink} target="_blank"><button className="w-24 bg-primary-500 hover:bg-primary-600 rounded-md text-white py-1 px-2">Github</button></a>
        <a href={uiLink} target="_blank"><button className="w-24 bg-primary-500 hover:bg-primary-600 rounded-md text-white py-1 px-2 mx-4">Ui</button></a>
        <Link href={`/dashboard/projects/${_id}`}><button className="w-24 bg-primary-500 hover:bg-primary-600 rounded-md text-white py-1 px-2">Open</button></Link>
      </div>
  </div>;
};

export default ProjectCard;
