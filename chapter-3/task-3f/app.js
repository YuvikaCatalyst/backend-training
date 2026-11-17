import "express-async-errors";
import express from "express";
import { randomUUID } from "crypto";
import notesRouter from "./notes.router.js";

const app = express();

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - ${new Date().toISOString()}`);
  next();
});

app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
});

app.use(express.json());

app.use("/notes", notesRouter);

app.use((req, res) => {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found" } });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
