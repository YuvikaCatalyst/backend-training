import greet from "./greet.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

greet("Alice");
console.log("File:", __filename);

console.log("Directory:", __dirname);
