const fs = require("fs");

export const writeBufferToFile = (bufferData, filePath) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, bufferData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
};
