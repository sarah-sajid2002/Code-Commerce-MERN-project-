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

//Get the all product list
app.get("/read", async (req, res) => {
  const productList = await Product.find({});
  try {
    res.status(200).json({
      status: "Success",
      data: {
        productList,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err,
    });
  }
});

//Update a product based on the id
app.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

  res.send("Product updated successfully!");
});

//Delete a product based on the id
app.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
