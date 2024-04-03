"use server";

import path from "path";
import fs from "fs";
import User from "@/models/Users";
import { connectToDatabase } from "@/db/dbconnect";
import { cookies } from "next/headers";
import { verifyToken } from "@/libs/verify_token";
import { blobToBuffer } from "@/libs/blobToBuffer";

export const saveFile = async (FormData) => {
  const  image  = FormData.get("image");

  console.log(image)
  console.log(await FormData)

  const uploadDirectory = path.join(__dirname, "../uploads");

  // Generate a unique filename for the image
  const fileName = `image_${Date.now()}.png`;

  let result;

  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify) {
    redirect("/");
  }

  // try {
  //   // Check if the upload directory exists, if not, create it
  //   if (!fs.existsSync(uploadDirectory)) {
  //     fs.mkdirSync(uploadDirectory, { recursive: true });
  //   }

    

  //   result = { status: true, message: "file Saved", fileName };


  // } catch (error) {
  //   console.log(error);
  //   result = { status: false, message: "file not saved" };
  // }

  return JSON.stringify(result);
};
