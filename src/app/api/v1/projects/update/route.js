import Project from "@/models/Projects";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    const {
      projectId,
      projectName,
      description,
      techStack,
      appType,
      gitLink,
      uiLink,
    } = await req.json();

    const existingProject = await Project.findById(projectId);

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

    console.log("Project before update:", existingProject);
    console.log("Project after update:", updatedProject);

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
