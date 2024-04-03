const fs = require('fs');
const path = require('path');

export function deleteFile(filePath) {
    // Construct the file path
    

    try {
        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath);
            console.log(`File '${filePath}' has been deleted successfully.`);
        } else {
            console.log(`File '${filePath}' does not exist.`);
        }
    } catch (error) {
        console.error(`Error deleting file '${filePath}':`, error);
    }
}