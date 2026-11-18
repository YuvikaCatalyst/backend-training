import fs from "fs";
import path from "path";
import { Transform } from "stream";

const filePath = process.argv[2];
const filter = process.argv[3];
const [column, value] = filter.split("=");
const outputPath = path.join(path.dirname(filePath), "output.csv");

let headers = null;
let leftover = "";

function handleLine(line, stream) {
  line = line.trim();

  if (line === "") {
    return;
  }

  const cells = line.split(",");

  if (headers === null) {
    headers = cells;
    stream.push(line + "\n");
    return;
  }

  const columnIndex = headers.indexOf(column);

  if (cells[columnIndex] === value) {
    stream.push(line + "\n");
  }
}

const filterRows = new Transform({
  transform(chunk, encoding, callback) {
    const lines = (leftover + chunk.toString()).split("\n");
    leftover = lines.pop();

    lines.forEach((line) => handleLine(line, this));

    callback();
  },

  flush(callback) {
    handleLine(leftover, this);
    callback();
  },
});

const readStream = fs.createReadStream(filePath);
const writeStream = fs.createWriteStream(outputPath);

readStream.pipe(filterRows).pipe(writeStream);

writeStream.on("finish", () => {
  console.log("Matching rows written to", outputPath);
});
