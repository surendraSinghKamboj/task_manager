"use server";

import Project from "@/models/Projects";
import { connectToDatabase } from "@/db/dbconnect";
import { verifyToken } from "@/libs/verify_token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Task } from "@/models/Task";

export const projectById = async (_id) => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  try {
    const verify = await verifyToken(auth);
    await connectToDatabase();

    const project = await Project.findById(_id).populate("createdBy", "name photo").populate("colabs","name photo");
   
    if (!project) {
      return false;
    }
    let createdBy = verify.decoded.name;

    const tasks = await Task.find({ project: _id }).populate("createdBy", "name photo");

    return { project, createdBy, tasks };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchAllProjects = async () => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    console.log("first");
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  try {
    await connectToDatabase();
    const projects = await Project.find({ createdBy: verify.decoded._id });
    return projects;
  } catch (error) {
    return [];
  }
};
