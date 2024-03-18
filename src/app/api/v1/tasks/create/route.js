import { connectToDatabase } from "@/db/dbconnect";
import { verifyToken } from "@/libs/verify_token";
import { Task } from "@/models/Task";
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
    const { data, projectId } = await req.json();
    console.log(data, projectId);

    const verify = await verifyToken(authCookie.value);

    if (!verify.valid) {
      const response = NextResponse.json({
        message: "Invalid Token.",
      });
      response.headers.set("location", "/");
      return response;
    }

    await connectToDatabase();

    const task = await Task.create({
      taskName: data.taskName,
      type: data.type,
      description: data.description,
      status: "Not Assigned",
      createdBy: verify.decoded._id,
      project: projectId,
    });



    if (!task) {
      return new NextResponse(
        JSON.stringify({ error: "Caould Not created Task" }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }



    return new NextResponse(JSON.stringify({ task }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        location: `/dashboard/projects/${projectId}/tasks/${task._id}`,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error("An error occurred during project creation.", {
      status: 500,
    });
  }
};

//| {
//|   valid: true,
//|   decoded: {
//|     _id: '65f6a968c4a39d7a8196a9b7',
//|     email: 'surendra.singh.kamboj@hotmail.com',
//|     iat: 1710779815,
//|     name: 'Surendra Singh kamboj'
//|   }
//| }
