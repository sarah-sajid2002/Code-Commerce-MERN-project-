const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const Product = require("./models/product");

const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    // "mongodb+srv://sarahsajid19:3QcEHlfEcJNYZplC@cluster0.udd7a6x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    "mongodb://127.0.0.1/CodeCommerce"
  )
  .then((res) => console.log("connected to mongodb..." + res))
  .catch((err) => console.error("could not connect to mongodb " + err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create", async (req, res) => {
  try {
    const product = new Product({ ...req.body });
    await product.save();
    res.status(201).json({
      status: "Success",
      message: "Product saved to the database!",
      product,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Some thing went wrong",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
