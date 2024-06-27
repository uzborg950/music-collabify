import { Router } from "express";
import trackRoutes from "./tracks/api";
const routes = [trackRoutes];

// routes.get("/", (req, res) => {
//   return res.json({ message: "Hello Worlds" });
// });

export default routes;
