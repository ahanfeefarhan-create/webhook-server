const express = require("express");
const app = express();
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

const PORT = process.env.PORT || 3000;

let coverageData = [];
let idCounter = 1;

app.post("/client-coverage", (req, res) => {
  const { address, services,coverage } = req.body;
  if (!address || !services) return res.status(400).json({ error: "address and services are required" });
  const entry = { id: idCounter++, address, services, coverage, receivedAt: new Date().toISOString() };
  coverageData.push(entry);
  console.log("Webhook received:", entry);
  res.status(201).json(entry);
});

app.get("/get-coverage", (req, res) => res.json(coverageData));
app.get("/", (req, res) => res.send("Webhook server running!"));

app.listen(PORT, () => console.log(`Webhook server running on port ${PORT}`));