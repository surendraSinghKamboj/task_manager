"use server";
import { verifyToken } from "@/libs/verify_token";
import User from "@/models/Users";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

//-------------------------------------------Data Type----------------------------------------
/**
 * {
 * _id: new ObjectId('65f6a968c4a39d7a8196a9b7'),
 * name: 'john doe',
 * email: 'john@hotmail.com',
 * contact: '0123456789',
 * userRole: 'user',
 * password: '',
 * createdAt: 2024-03-17T08:27:20.612Z,
 * updatedAt: 2024-03-17T08:27:20.612Z,
 * __v: 0
 * }
 */
// --------------------------------------------------------------------------------------------

export const fetchProfile = async () => {
  const auth = cookies().get("auth")?.value;
  if (!auth) {
    redirect("/");
  }
  const verify = await verifyToken(auth);
  if (!verify) {
    redirect("/");
  }

  let user;
  try {
    user = await User.findById(verify.decoded._id);
  } catch (error) {
    console.log(error); // Log the error here
    user = null;
  }
  if (!user) {
    redirect("/");
  }

  return {
    name: user.name,
    email: user.email,
    contact: user.contact,
    photo: user.photo,
  };
};
