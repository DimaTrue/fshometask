const fs = require("fs/promises");
const path = require("path");

const gendersFolderName = "/genders";
const girlsFolderName = "girls";
const boysFolderName = "boys";
const femaleGender = "female";
const maleGender = "male";

const folderNamesArr = [boysFolderName, girlsFolderName];

const iterateParceAndReplaceFilesByGenderProperty = async (folderName) => {
  try {
    const files = await fs.readdir(
      path.join(__dirname, gendersFolderName, folderName)
    );

    for (const file of files) {
      const fileContent = await fs.readFile(
        path.join(__dirname, gendersFolderName, folderName, file)
      );
      const parsedFileContent = await JSON.parse(fileContent);

      if (
        parsedFileContent.gender === femaleGender &&
        folderName === boysFolderName
      ) {
        await fs.rename(
          path.join(__dirname, gendersFolderName, folderName, file),
          path.join(__dirname, gendersFolderName, girlsFolderName, file)
        );
      }

      if (
        parsedFileContent.gender === maleGender &&
        folderName === girlsFolderName
      ) {
        await fs.rename(
          path.join(__dirname, gendersFolderName, folderName, file),
          path.join(__dirname, gendersFolderName, boysFolderName, file)
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const iterateGenderFolders = async () => {
  for (const directoryName of folderNamesArr) {
    await iterateParceAndReplaceFilesByGenderProperty(directoryName);
  }
};

iterateGenderFolders();
