"use server";

import User from "@/models/Users";
import { connectToDatabase } from "@/db/dbconnect";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/verify_token";
import { fileWriter } from "@/libs/fileWriter";
import { deleteFile } from "@/libs/deleteFile";

export const saveFile = async (formdata) => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify) {
    redirect("/");
  }

  const image = formdata.get("image");

  let result;
  let user;

  try {
    await connectToDatabase();
    user = await User.findById(verify.decoded._id);
    if (user.photo) {
      const status = deleteFile(user.photo);
    }

    const status = await fileWriter(image);
    if (!status) {
      result = { status: false, message: "File not Saved." };
    }
    if (status) {
      user = await User.findByIdAndUpdate(verify.decoded._id, {
        photo: status,
      });
      if (!user) {
        result = { status: false, message: "File not Saved." };
      } else {
        result = { status: true, message: "File Saved Successfully." };
      }
    }
  } catch (error) {
    console.log(error);
    result = { status: false, message: "File not Saved." };
  }

  return JSON.stringify(result);
};
