import express from "express";
import HttpError from "./HttpError";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.type("text/plain").send("hello world");
});

app.use((req, res, next) => {
  next(new HttpError(404, `Not Found: ${req.url}`));
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res
      .status(err.status || 500)
      .type("text/plain")
      .send(err.message);
  }
);

export default app;
