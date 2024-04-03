import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const GET = (req, { params: { fileName } }) => {
  const filePath = path.join(process.cwd(), "src", "uploads", fileName);

  try {
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath);

      // Determine content type based on file extension
      const contentType = getContentType(fileName);

      // Create a NextResponse instance
      const response = new NextResponse(fileData);

      // Set appropriate content type header
      response.headers.set("Content-Type", contentType);

      // Return the response
      return response;
    } else {
      // Return a 404 response if the file is not found
      return new NextResponse(null, { status: 404 });
    }
  } catch (error) {
    console.error("Error handling file:", error);
    // Return a 500 response for internal server error
    return new NextResponse(null, { status: 500 });
  }
};

// Function to determine content type based on file extension
function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}
