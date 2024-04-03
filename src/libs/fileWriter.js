import path from "path";
import { writeFile } from "fs/promises";

export const fileWriter = async (image) => {
  try {
    const byteLength = await image.arrayBuffer();

    const bufferData = Buffer.from(byteLength);

    const pathOfImage = `./src/uploads/${new Date().getTime()}${path.extname(
      image.name
    )}`;

    await writeFile(pathOfImage, bufferData);

    console.log("Image uploaded successfully:", pathOfImage);

    return pathOfImage;
  } catch (error) {
    console.error("Error  :   ", error);
    return null;
  }
};
