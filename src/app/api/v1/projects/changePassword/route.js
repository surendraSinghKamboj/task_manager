import { connectToDatabase } from "@/db/dbconnect";
import generateSHA512 from "@/libs/sha_hash";
import { NextResponse } from "next/server";
import User from "@/models/User";

export const POST = async (req) => {
  try {
    await connectToDatabase();

    const {
      data: { email, oldPassword, newPassword },
    } = await req.json();

    if (!email || !oldPassword || !newPassword) {
      return new NextResponse(
        JSON.stringify({ message: "Required fields missing" }),
        { status: 400, "Content-Type": "application/json" }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
        "Content-Type": "application/json",
      });
    }

    const hashedOldPassword = generateSHA512(oldPassword);

    if (hashedOldPassword !== user.password) {
      return new NextResponse(
        JSON.stringify({ message: "Old password is Incorrect" }),
        { status: 401, "Content-Type": "application/json" }
      );
    }

    const hashedNewPassword = generateSHA512(newPassword);

    user.password = hashedNewPassword;
    await user.save();

    return NextResponse(
      JSON.stringify({ message: "Password changed successfully" }),
      { status: 200, "Content-Type": "application/json" }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.error("An error occurred during login.", {
      status: 500,
    });
  }
};
