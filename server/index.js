import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const app = express();
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(router);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB is conccted"));

// Deploing
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Listen

app.listen(process.env.PORT || 5000, () =>
  console.log("server is runing on post 5000")
);
