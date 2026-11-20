import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, "config", "app.config.json");
const absolutePath = path.resolve(__dirname, "config", "app.config.json");

console.log("ES Modules");
console.log("Config path (join):", configPath);
console.log("Config path (resolve):", absolutePath);
console.log("Directory:", path.dirname(configPath));
console.log("Name:", path.basename(configPath));
console.log("Extension:", path.extname(configPath));
