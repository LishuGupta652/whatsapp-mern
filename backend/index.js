// imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

// listen
app.listen(PORT, () => {
  console.log(`app live on http://localhost:${PORT}`);
});
