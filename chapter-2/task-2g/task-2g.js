import dotenv from "dotenv";

const args = process.argv;
const envIndex = args.indexOf("--env");
const envName = args[envIndex + 1];

dotenv.config({ path: `.env.${envName}` });

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB_URL:", process.env.DB_URL);
