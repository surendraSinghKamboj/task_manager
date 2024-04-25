"use server";
import { connectToDatabase } from "@/db/dbconnect";
import Requests from "@/models/Requests";
import { verifyToken } from "@/libs/verify_token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Project from "@/models/Projects";

export const makeRequest = async (data) => {
  const { projectId, userId } = data;
  let status = { status: false, message: "" };

  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }

  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }

  if (verify.decoded._id === userId) {
    return JSON.stringify({
      status: true,
      message: "You can not add your Self.",
    });
  }

  try {
    await connectToDatabase();

    const single = await Project.findById(projectId);

    if (!single) {
      return JSON.stringify({
        status: false,
        message: "Project not found",
      });
    }

    if (single.createdBy.toString() === userId.toString()) {
      return JSON.stringify({
        status: false,
        message: "User is Owner of this project.",
      });
    }

    const res = await Requests.findOne({
      projectId: projectId,
      assignTo: userId,
    });

    if (res) {
      return JSON.stringify({
        status: true,
        message: "You have already reqested",
      });
    }

    const project = await Project.find({
      projectId: projectId,
      colabs: userId,
    });

    if (!project) {
      return JSON.stringify({
        status: true,
        message: "User already have access.",
      });
    }

    const request = await Requests.create({
      projectId,
      createBy: verify.decoded._id,
      assignTo: userId,
    });
    if (!request) {
      status = { status: false, message: "Unable to make Request." };
    }

    status = { status: true, message: "Request Sent Successfully." };
  } catch (error) {
    status = { status: false, message: "Internal Server Error." };
  }

  return JSON.stringify(status);
};

export const findRequest = async () => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }

  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }


  let requestData;
  try {
    const data = await Requests.find({
      assignTo: verify.decoded._id,
      visible: true,
    })
      .populate("projectId", "projectName")
      .populate("createBy", "name");
    if (!data) {
      requestData = { status: false, data: [] };
    }
    // console.log(data)
    requestData = { status: true, data };
  } catch (error) {
    requestData = { status: false, data: [] };
    console.log(error);
  }

  return JSON.stringify(requestData);
};

export const acceptRequest = async (data) => {
  const { reqId, projectId } = data;
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }

  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }

  let status = { status: false };

  try {
    const project = await Project.findByIdAndUpdate(projectId, {
      $push: { colabs: verify.decoded._id },
    });
    if (!project) {
      return JSON.stringify({ status: false });
    }
    const res = await Requests.findByIdAndUpdate(reqId, {
      isAccepted: true,
      visible: false,
    });
    if (!res) {
      return JSON.stringify({ status: false });
    }
    status = { status: true };
    // status = { status: true };
    // status = { status: true };
  } catch (error) {
    console.log(error);
    status = { status: false };
  }
  return JSON.stringify(status);
};

export const rejectRequest = async (data) => {
  const { reqId } = data;
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }

  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }

  let status = { status: false };

  try {
    const res = await Requests.findByIdAndUpdate(reqId, {
      isAccepted: false,
      visible: false,
    });
    if (!res) {
      return JSON.stringify({ status: false });
    }
    status = { status: true };
  } catch (error) {
    console.log(error);
    status = { status: false };
  }
  return JSON.stringify(status);
};
