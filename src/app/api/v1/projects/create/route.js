import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const cookieStore = cookies();
    const theme = cookieStore.get("auth");

    const { data } = await req.json();
    console.log(theme)
    
    const response = NextResponse.json({
      message: "Project Created Successfully.",
      data,
    });

    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {}
};
