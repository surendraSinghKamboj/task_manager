import Project from "@/models/Projects";
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
        message: "no Token.",
      });
      response.headers.set("location", "/");
      return response;
    }

    const {
      projectId,
      projectName,
      description,
      techStack,
      appType,
      gitLink,
      uiLink,
    } = await req.json();

    const verify =await verifyToken(authCookie.value);
    if (!verify.valid) {
      const response = NextResponse.json({
        message: "Invalid Token.",
      });
      response.headers.set("location", "/");
      return response;
    }

    connectToDatabase();

    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return new NextResponse(
        JSON.stringify({ message: "Project Doesn't Exist." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", Server: "Apache" },
        }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        projectName,
        description,
        techStack: techStack.split(","),
        appType,
        gitLink,
        uiLink,
      },
      { new: true }
    );

    if (!updatedProject) {
      const response = NextResponse.json({
        message: "Project not found.",
      });
      response.headers.set("Content-Type", "application/json");
      return response;
    }

    // console.log("Project before update:", existingProject);
    // console.log("Project after update:", updatedProject);

    const response = NextResponse.json({
      message: "project updation completed.",
    });
    response.headers.set(
      "location",
      `/dashboard/projects/${updatedProject._id}`
    );
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.error("error got on updation.", {
      status: 500,
    });
  }
};
