const express = require("express");
// importing mongoose
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// connecting mongoose
mongoose
  .connect("mongodb://127.0.0.1/CodeCommerce")
  .then((res) => console.log("connected to mongodb..." + res))
  .catch((err) => console.error("could not connect to mongodb " + err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
