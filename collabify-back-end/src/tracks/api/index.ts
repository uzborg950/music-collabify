import { Router } from "express";
import { v4 as uuid } from "uuid";
import path from "path";
import { audioMulter } from "./audioMulter";
const trackRoutes = Router();

trackRoutes.get("/tracks/", (req, res) => {
  return res.send("hello world");
});
trackRoutes.post("/tracks/upload", audioMulter.single("audio"), (req, res) => {
  if (!req.file) return res.send({ message: "failed to upload file" });
  const metadata = req.body;
  //todo call trackservice and store metadata (projectId, name, layerIndex, startBeat, color...) checkout mockData

  const id = uuid(); //Id for new audio file


  return res.send({ message: "file uploaded successfully", file: req.file, id:  });
});

export default trackRoutes;
