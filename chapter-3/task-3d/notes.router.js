import express from "express";
import AppError from "./AppError.js";

const router = express.Router();

let notes = [];
let nextId = 1;

router.get("/", (req, res) => {
  res.json(notes);
});

router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const note = { id: nextId, title, content };
  nextId++;
  notes.push(note);
  res.status(201).json(note);
});

router.get("/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  res.json(note);
});

router.put("/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  note.title = req.body.title;
  note.content = req.body.content;
  res.json(note);
});

router.delete("/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  notes = notes.filter((n) => n.id !== note.id);
  res.sendStatus(204);
});

export default router;
