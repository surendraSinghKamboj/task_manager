import Task from "@/models/Task";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/db/dbconnect";
import { verifyToken } from "@/libs/verify_token";

export const PUT = async (req) => {
  const cookieStore = cookies(req);
  const authCookie = cookieStore.get("auth");
  try {
    if (!authCookie || !authCookie.value) {
      const response = NextResponse.json({
        message: "No token .",
      });
      response.headers.set("location", "/");
      return response;
    }

    const {
      taskId,
      taskName,
      type,
      description,
      status,
      assignedTo,
      startedOn,
      completedInTime,
      deadline,
      project,
    } = await req.json();

    const verify = await verifyToken(authCookie.value);
    if (!verify.valid) {
      const response = NextResponse.json({
        message: "Invalid token.",
      });
      response.headers.set("location", "/");
      return response;
    }

    connectToDatabase();

    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return new NextResponse(
        JSON.stringify({ message: "Task doesn't exist." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", Server: "Apache" },
        }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        taskName,
        type,
        description,
        status,
        assignedTo,
        startedOn,
        completedInTime,
        deadline,
        project,
      },
      { new: true }
    );

    if (!updatedTask) {
      const response = NextResponse.json({
        message: "Task not found.",
      });
      response.headers.set("Content-Type", "application/json");
      return response;
    }

    const response = NextResponse.json({
      message: "Task update completed.",
    });
    response.headers.set("location", `/dashboard/tasks/${updatedTask._id}`);
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.error("error got task updation.", {
      status: 500,
    });
  }
};
