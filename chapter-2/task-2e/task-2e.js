import { Readable, Transform, Writable } from "stream";
import { pipeline } from "stream/promises";

const readable = Readable.from(["hello ", "world ", "from ", "streams"]);

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

const writable = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

async function run() {
  try {
    await pipeline(readable, upperCase, writable);
    console.log("Pipeline finished");
  } catch (error) {
    console.log("Pipeline failed:", error.message);
  }
}

run();
