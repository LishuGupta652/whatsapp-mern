// imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Message from "./dbMessage.js";
cors();
dotenv.config();
// App Config
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// DB config
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Database Connencted");
});

// Api routes
app.get("/", (req, res) => {
  res.status(200).send("hello");
});

app.get("/api/v1/message/", (req, res) => {
  const dbMessage = req.body;

  Message.find(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(` ${data}`);
    }
  });
});

app.post("/api/v1/message/new", (req, res) => {
  const dbMessage = req.body;

  Message.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`New message create: ${data}`);
    }
  });
});

// listen
app.listen(PORT, () => {
  console.log(`app live on http://localhost:${PORT}`);
});
