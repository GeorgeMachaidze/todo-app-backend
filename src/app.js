import express from "express";
import connect from "./database/mongo.js";
import dotenv from "dotenv";
import { getAllproject } from "./controllers/project-controller.js";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ message: "app works!" });
});

app.get("/api/projects", getAllproject);

app.listen(3000);
