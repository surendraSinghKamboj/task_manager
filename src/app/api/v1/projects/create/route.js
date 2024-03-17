import { verifyToken } from "@/libs/verify_token";
import Project from "@/models/Projects";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
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
      data: { projectName, description, techStack, appType, gitLink, uiLink },
    } = await req.json();

    const verify = verifyToken(authCookie.value);
    if (!verify.valid) {
      const response = NextResponse.json({
        message: "Invalid Token.",
      });
      response.headers.set("location", "/");
      return response;
    }

    const project = await Project.create({
      projectName,
      description,
      techStack: techStack.split(","),
      appType,
      gitLink,
      uiLink,
      createdBy: verify.decoded._id,
    });

    if (!project) {
      const response = NextResponse.json({
        message: "Project Creation Failed.",
      });
      response.headers.set("Content-Type", "application/json");
      return response;
    }

    const response = NextResponse.json({
      message: "Project Created Successfully.",
    });
    response.headers.set("location", `/dashboard/projects/${project._id}`);
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.error("An error occurred during project creation.", {
      status: 500,
    });
  }
};
