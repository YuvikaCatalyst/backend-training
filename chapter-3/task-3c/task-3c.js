import express from "express";
import { randomUUID } from "crypto";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

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

let notes = [];
let nextId = 1;

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const note = { id: nextId, title, content };
  nextId++;
  notes.push(note);
  res.status(201).json(note);
});

app.get("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  res.json(note);
});

app.put("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  note.title = req.body.title;
  note.content = req.body.content;
  res.json(note);
});

app.delete("/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  notes = notes.filter((n) => n.id !== note.id);
  res.sendStatus(204);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
