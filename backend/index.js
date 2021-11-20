// imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Message from "./dbMessage.js";
import Pusher from "pusher";

dotenv.config();
// App Config
const app = express();
const PORT = process.env.PORT || 8000;

// pusher js (Realtime)

const pusher = new Pusher({
  appId: "1301032",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

// Middleware
app.use(express.json());
app.use(cors());
// DB config
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log("Database Connencted");
  const db = mongoose.connection;
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
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
