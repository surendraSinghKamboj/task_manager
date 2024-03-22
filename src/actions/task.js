"use server";

import { connectToDatabase } from "@/db/dbconnect";
import { verifyToken } from "@/libs/verify_token";
import { Task } from "@/models/Task";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getTask = async (taskId, projectId) => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }
  let task;
  try {
    await connectToDatabase();
    task = await Task.findById(taskId);
    if (!task) {
      task = { status: false };
    }
    task = { status: true, task };
  } catch (error) {
    console.log(error);
    task = { staus: false };
  }

  if (!task.status) {
    redirect(`/dashboard/projects/${projectId}`);
  }

  console.log(task)
  return task;
};
