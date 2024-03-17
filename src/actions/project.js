"use server";

import { connectToDatabase } from "@/db/dbconnect";
import Project from "@/models/Projects";
import User from "@/models/Users";

export const projectById = async (_id) => {
  try {
    await connectToDatabase();
    const project = await Project.findById(_id); // Await for the project to resolve
    if (!project) {
      return false;
    }
    const user = await User.findById(project.createdBy);
    let createdBy;
    if (!user) {
      createdBy = "Anonymous";
    } else {
      createdBy = user.name;
    }

    return {project,createdBy};
  } catch (error) {
    console.log(error);
    return false;
  }
};
