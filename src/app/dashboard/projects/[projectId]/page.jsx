import React from "react";
import Image from "next/image";
import Link from "next/link";
import NoTask from "@/components/task/NoTask";
import TaskRow from "@/components/task/TaskRow";
import AddUser from "@/components/project/AddUser";
import { projectById } from "@/actions/project";
import { FaFigma, FaGithub } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { convertDateTime } from "@/libs/dateTime";
import { extractFileName } from "@/libs/extractFilename";
import { RiAdminFill } from "react-icons/ri";

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
    createdBy: {
      _id: new ObjectId('65f6a968c4a39d7a8196a9b7'),
      name: 'John Doe',
      photo: './src/uploads/1712165694407.png'
    },
    createdAt: 2024-03-18T01:23:01.363Z,
    updatedAt: 2024-03-18T01:23:01.363Z,
    __v: 0
  },
  createdBy: 'John Doe',
  tasks: []
}
*/
//  --------------------------------------------------------------------------------------------

const ProjectDetails = async ({ params: { projectId } }) => {
  const data = await projectById(projectId);

  const { project, createdBy, tasks } = data;

  // console.log(project)

  // console.log(project)
  return !data ? (
    <div className="w-full h-screen flex justify-center items-center">
      <h6>No Project Found</h6>
    </div>
  ) : (
    <>
      <div className="flex ml-4 mt-4 justify-center items-center w-fit">
        {/* Created By */}
        <div className="group w-fit relative mr-2 cursor-pointer">
          {project.createdBy?.photo ? (
            <Image
              src={"/profile/pic/" + extractFileName(project.createdBy.photo)}
              alt="Created By"
              width={30}
              height={30}
              className="rounded-full w-8 h-8 mt-4"
            />
          ) : (
            <RiAdminFill className="text-3xl mt-4 rounded-full hover:bg-slate-400 text-primary-800 transition-all duration-500" />
          )}
          <span className="group-hover:block hidden absolute w-max py-1 px-2 -top-4 bg-slate-400">
            {project.createdBy.name}
          </span>
        </div>
        {/* other colabs users */}
        {project.colabs &&
          project.colabs.map((colab) => (
            <div className="group w-fit relative mr-2 cursor-pointer" key={colab._id}>
              {colab?.photo ? (
                <Image
                  src={
                    "/profile/pic/" + extractFileName(colab.photo)
                  }
                  alt="Created By"
                  width={30}
                  height={30}
                  className="rounded-full w-8 h-8 mt-4"
                />
              ) : (
                <RiAdminFill className="text-3xl mt-4 rounded-full hover:bg-slate-400 text-primary-800 transition-all duration-500" />
              )}
              <span className="group-hover:block hidden absolute w-max py-1 px-2 -top-4 bg-slate-400">
                {colab.name}
              </span>
            </div>
          ))}
        {/* Add Button */}
        <AddUser projectId={projectId} />
      </div>
      <div className="w-full p-4 flex flex-wrap justify-center sm:justify-start items-center">
        <div className="flex relative flex-col p-2 min-h-96 shadow shadow-secondary-300">
          <h3 className="text-2xl font-semibold">{project.projectName}</h3>
          <p className="text-gray-400">{project.appType}</p>
          <span className="mb-4 text-gray-500 cursor-pointer">{project.createdBy.name}</span>
          <div className="flex gap-2 flex-wrap">
            {project.techStack &&
              project.techStack.map((tech, index) => (
                <button
                  key={index}
                  className="px-4 py-1 bg-gray-500 hover:opacity-80 transition-all duration-500 text-white text-sm rounded-full"
                >
                  {tech}
                </button>
              ))}
          </div>
          <div className="flex justify-around w-full mt-4">
            <a href={project.gitLink} target="_blank">
              <button className="text-2xl text-primary-500 hover:text-secondary-500 hover:scale-125 transition-all duration-500">
                <FaGithub />
              </button>
            </a>
            <a href={project.uiLink} target="_blank">
              <button className="text-2xl text-primary-500 hover:text-secondary-500 hover:scale-125 transition-all duration-500">
                <FaFigma />
              </button>
            </a>
          </div>
          <span className="absolute bottom-2 left-2 text-gray-400">
            Created At: {convertDateTime(project.createdAt)}
          </span>
          <Link href={`/dashboard/projects/${projectId}/tasks/create`}>
            <MdAddTask className="text-3xl text-green-600 hover:opacity-80 hover:scale-125 transition-all duration-700 absolute right-2 bottom-2" />
          </Link>
        </div>
        {/* Project Description */}
        <div className="min-h-96 container sm:w-auto mx-auto m-2">
          <h5 className="text-primary-950 text-2xl underline underline-offset-4 mb-4">
            About This Project
          </h5>
          <p className="text-lg">{project.description}</p>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------------
      
                                                 {
                                              _id: new ObjectId('65f87be8b4ac8ce41b942034'),
                                              taskName: 'New Task',
                                              type: 'Designer Tasks',
                                              description: 'Task for testing ',
                                              status: 'Not Assigned',
                                              createdBy: {
                                                _id: new ObjectId('65f6a968c4a39d7a8196a9b7'),
                                                name: 'John Doe'
                                              },
                                              completedInTime: false,
                                              project: new ObjectId('65f71d6fa3dadd2dc61f47f0'),
                                              createdAt: 2024-03-18T17:37:44.265Z,
                                              updatedAt: 2024-03-18T17:37:44.265Z,
                                              __v: 0
                                            }
      
     ------------------------------------------------------------------------------------------------------------------ */}

      {tasks && tasks.length === 0 ? (
        <NoTask projectId={project._id} />
      ) : (
        <TaskRow data={tasks} projectId={project._id} />
      )}
    </>
  );
};

export default ProjectDetails;
