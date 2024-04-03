import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const GET = async (req) => {
  try {
    const file = await req.formData();

    const image = file.get("image");

    const byteLength = await image.arrayBuffer();

    const bufferData = Buffer.from(byteLength);

    const pathOfImage = `./src/uploads/${new Date().getTime()}${path.extname(image.name)}`;

    await writeFile(pathOfImage, bufferData);

    console.log("Image uploaded successfully:", pathOfImage);

    return NextResponse.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.error(500, "Error uploading image");
  }
};
