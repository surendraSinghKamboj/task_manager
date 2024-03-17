import { connectToDatabase } from "@/db/dbconnect";
import generateSHA512 from "@/libs/sha_hash";
import { generateToken } from "@/libs/token_generator";
import User from "@/models/Users";

import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDatabase();

    const {
      data: { email, password },
    } = await req.json();

    // Ensure data contains all required fields (name, email, contact, userRole, password)
    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Required fields missing" }),
        { status: 400, "Content-Type": "application/json" } // 400 Bad Request
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      new NextResponse(
        JSON.stringify({ message: "Email or Password Incorrect" }),
        { status: 401, "Content-Type": "application/json" } // 401 Internal Server Error
      );
    }

    // Hash the user's password with SHA512
    const hashedPassword = generateSHA512(password);

    if (hashedPassword !== user.password) {
      new NextResponse(
        JSON.stringify({ message: "Email or Password Incorrect" }),
        { status: 401, "Content-Type": "application/json" } // 401 Internal Server Error
      );
    }

    const token = generateToken({ _id: user._id, email });

    const response = NextResponse.json({ message: "Login successful." });
    const expires = new Date();
    expires.setTime(expires.getTime() + 72 * 60 * 60 * 1000); // 72 hours * 60 minutes * 60 seconds * 1000 milliseconds per second
    response.headers.set(
      "Set-Cookie",
      `auth=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expires.toUTCString()}`
    );

    response.headers.set("location", "/dashboard");

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.error("An error occurred during login.", {
      status: 500,
    });
  }
};
