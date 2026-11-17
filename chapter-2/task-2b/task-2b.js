import fs from "fs/promises";
import path from "path";

const folderPath = process.argv[2];
const outputPath = path.join(folderPath, "..", "merged.txt");

async function mergeTextFiles() {
  try {
    const files = await fs.readdir(folderPath);

    const txtFiles = files.filter((file) => path.extname(file) === ".txt");

    const contents = await Promise.all(
      txtFiles.map((file) => fs.readFile(path.join(folderPath, file), "utf8"))
    );

    await fs.writeFile(outputPath, contents.join(""));

    console.log("Merged files:", txtFiles);
    console.log("Output written to", outputPath);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

mergeTextFiles();
