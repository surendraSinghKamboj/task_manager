import { connectToDatabase } from "@/db/dbconnect";
import generateSHA512 from "@/libs/sha_hash";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectToDatabase();

    const {
      data: { name, email, contact, password },
    } = await req.json();

    // console.log(name);
    // Ensure data contains all required fields (name, email, contact, userRole, password)
    if (!name || !email || !contact || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Required fields missing" }),
        { status: 400, "Content-Type": "application/json" } // 400 Bad Request
      );
    }

    // Hash the user's password with SHA512
    const hashedPassword = generateSHA512(password);

    console.log(hashedPassword);
    // Create a new User in Database
    const newUser = await User.create({
      name,
      email,
      contact,
      userRole: "user",
      password: hashedPassword,
    });

    console.log({ newUser });

    const response = new NextResponse(
      JSON.stringify({ message: "User created successfully", newUser }),
      { status: 201, "Content-Type": "application/json" } // 201 Created
    );

    response.headers.set("location", "/");
    return response;
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "An error occurred while creating the user" }),
      { status: 500, "Content-Type": "application/json" } // 500 Internal Server Error
    );
  }
};
