const fs = require("fs/promises");
const path = require("path");

const nestedFoldersName = "/nested_folders";
const nestedFoldersPath = path.join(__dirname, nestedFoldersName);

const getAndReplaceFilesFromNestedFolder = async (currentPath) => {
  try {
    const folderContentArr = await fs.readdir(currentPath);
    for (const content of folderContentArr) {
      const resStat = await fs.stat(path.join(currentPath, content));
      if (resStat.isDirectory()) {
        getAndReplaceFilesFromNestedFolder(path.join(currentPath, content));
      }

      if (resStat.isFile()) {
        const oldFilePath = path.join(currentPath, content);
        const newFilePath = path.join(nestedFoldersPath, content);
        await fs.rename(oldFilePath, newFilePath);
      }
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};

getAndReplaceFilesFromNestedFolder(nestedFoldersPath);
