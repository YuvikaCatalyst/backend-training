const path = require("path");

const configPath = path.join(__dirname, "config", "app.config.json");
const absolutePath = path.resolve(__dirname, "config", "app.config.json");

console.log("CommonJS");
console.log("Config path (join):", configPath);
console.log("Config path (resolve):", absolutePath);
console.log("Directory:", path.dirname(configPath));
console.log("Name:", path.basename(configPath));
console.log("Extension:", path.extname(configPath));
