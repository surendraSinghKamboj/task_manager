"use server";
import { verifyToken } from "@/libs/verify_token";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Project from "@/models/Projects";

export const fetchUser = async (type) => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  if (type) {
    return { user: { name: verify.decoded.name,photo : verify.decoded.photo } };
  }

  let projectsNumber = await Project.countDocuments({
    createdBy: verify.decoded._id,
  });
  if (!projectsNumber) {
    projectsNumber = 0;
  }

  let projects = await Project.find({ createdBy: verify.decoded._id })
    .sort({ updatedAt: -1 })
    .limit(3)
    .populate("createdBy", "name")
    .exec();

  if (!projects) {
    projects = [];
  }

  return { projectsNumber, projects };
};
