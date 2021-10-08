import express from "express";
// import express, { Application, Request, Response } from "express";

const app = express();
app.use(express.json());
export class startingServer {
  constructor(server_port: number) {
    app.listen(server_port, () => {
      console.log(
        `Server is listening on port ${server_port} ` +
          "App route its Working ==> " +
          new Date()
            .toISOString()
            .replace(/T/, " ") // replace T with a space
            .replace(/\..+/, "")
      );
    });
  }

  serverStarted() {
    return app;
  }
}
