"use server";
import { connectToDatabase } from "@/db/dbconnect";
import Requests from "@/models/Requests";
import { verifyToken } from "@/libs/verify_token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    console.log(error);
    console.table(data);
    status = { status: false, message: "Internal Server Error." };
  }

  return JSON.stringify(status);
};
