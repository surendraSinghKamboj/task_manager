const path = require("path");

export function extractFileName(filePath) {
  const fileName = path.basename(filePath);
  return fileName;
}
