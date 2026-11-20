const original = "Hello Backend";

const buffer = Buffer.from(original, "utf8");

const base64 = buffer.toString("base64");
const hex = buffer.toString("hex");

const fromBase64 = Buffer.from(base64, "base64").toString("utf8");
const fromHex = Buffer.from(hex, "hex").toString("utf8");

console.log("Original:", original);
console.log("Buffer:", buffer);
console.log("Base64:", base64);
console.log("Hex:", hex);
console.log("Back from base64:", fromBase64);
console.log("Back from hex:", fromHex);
console.log("Base64 matches original:", fromBase64 === original);
console.log("Hex matches original:", fromHex === original);
