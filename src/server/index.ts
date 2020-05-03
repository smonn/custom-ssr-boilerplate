import express from "express";

const port = process.env.PORT || "3000";
let app = require("./app").default;

if (module.hot) {
  module.hot.accept("./app", () => {
    console.log("HMR reloading `./app`...");
    try {
      app = require("./app").default;
    } catch (err) {
      console.error(err);
    }
  });

  console.log("Server-side HMR enabled!");
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`Launched at http://localhost:${port}`);
  });
