"use server";

import { connectToDatabase } from "@/db/dbconnect";
import { verifyToken } from "@/libs/verify_token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import User from "@/models/Users";

export const searchUsers = async (query) => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify.valid) {
    redirect("/");
  }

  let users;

  try {
    await connectToDatabase();

    // Query the database
    users = await User.find({
      $or: [
        { name: { $regex: query.query, $options: "i" } },
        { email: { $regex: query.query, $options: "i" } },
      ],
    });

    if (!users) {
      users = [];
    }
  } catch (error) {
    console.error(error);
    users = [];
  }

  return JSON.stringify(users);
};
