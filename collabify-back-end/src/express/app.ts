import express from "express";

import routes from "../routes";

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

const app = new App().server;
app.listen(process.env.SERVER_PORT, () =>
  console.log(`server is running on port ${process.env.SERVER_PORT}...`),
);

export default app;
