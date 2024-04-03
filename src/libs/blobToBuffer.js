export const blobToBuffer = (blobData) => {
  const bufferData = Buffer.from(blobData, "binary");
  return bufferData;
};
