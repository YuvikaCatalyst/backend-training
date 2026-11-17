import http from "http";

let notes = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    const url = new URL(req.url, "http://localhost");
    const parts = url.pathname.split("/");
    const id = Number(parts[2]);

    res.setHeader("Content-Type", "application/json");

    if (req.method === "GET" && url.pathname === "/notes") {
      res.writeHead(200);
      res.end(JSON.stringify(notes));
      return;
    }

    if (req.method === "POST" && url.pathname === "/notes") {
      const data = JSON.parse(body || "{}");
      const note = { id: nextId, title: data.title, content: data.content };
      nextId++;
      notes.push(note);
      res.writeHead(201);
      res.end(JSON.stringify(note));
      return;
    }

    if (parts[1] === "notes" && id) {
      const note = notes.find((n) => n.id === id);

      if (!note) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Note not found" }));
        return;
      }

      if (req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify(note));
        return;
      }

      if (req.method === "PUT") {
        const data = JSON.parse(body || "{}");
        note.title = data.title;
        note.content = data.content;
        res.writeHead(200);
        res.end(JSON.stringify(note));
        return;
      }

      if (req.method === "DELETE") {
        notes = notes.filter((n) => n.id !== id);
        res.writeHead(204);
        res.end();
        return;
      }
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
