import { verifyToken } from "@/libs/verify_token";
import Project from "@/models/Projects";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/db/dbconnect";

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
    const { projectId } = await req.json();

    const verify = await verifyToken(authCookie.value);
    if (!verify.valid) {
      const response = NextResponse.json({
        message: "Invalid token.",
      });
      response.headers.set("location", "/");
      return response;
    }

    await connectToDatabase();

    const deledtedProject = await Project.findByIdAndDelete(projectId);
    if (!deledtedProject) {
      return new NextResponse(
        JSON.stringify({ message: "Project not found" }),
        {
          status: 404,
          headers: { "Content  Type": "application/json", server: "Apache" },
        }
      );
    }

    const response = NextResponse.json({
      message: "Project Deleted Successfully",
    });
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.error("An error occured during project deletion.", {
      status: 500,
    });
  }
};
