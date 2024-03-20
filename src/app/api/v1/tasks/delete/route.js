import { verifyToken } from "@/libs/verify_token";
import { cookies } from "next/headers";
import { Task } from "@/models/Task";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const cookieStore = cookies(req);
  const authCookie = cookieStore.get("auth");

  try {
    if (!authCookie || !authCookie.value) {
      const response = NextResponse.json({
        message: "No Token provided",
      });
      response.headers.set("location", "/");
      return response;
    }

    const { taskId } = await req.json();
    const verify = await verifyToken(authCookie.value);
    if (!verify.valid) {
      const response = NextResponse.json({
        message: "Invalid Token",
      });
      response.headers.set("location", "/");
      return response;
    }
    const deletedProject = await Task.findByIdAndDelete(taskId);
    if (!deletedProject) {
      return new NextResponse(JSON.stringify({ message: "Task Not found" }), {
        status: 404,
        headers: { "Content type": "application/json", server: "Apache" },
      });
    }

    const response = NextResponse.json({
      message: "Task Deleted Successfully",
    });
    response.headers.set("Content-Type", "application/json");
    response.headers.set("content-type", "application/json");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.error("An error occured during project  deletion.", {
      status: 500,
    });
  }
};
