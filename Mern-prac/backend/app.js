const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { Schema } = mongoose;

require("dotenv/config");

const PORT = 3000;

const api = process.env.API_URL;

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Schema

const productSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

app.get(`${api}/products`, async (req, res) => {
  const products = await Product.find();
  if (!products.length) return res.status(404).json({ success: false });

  res.send(products);
});

app.post(`${api}/products`, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  await product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
      throw new Error(err.message);
    });
});

// Connecting to the database

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`${err}`));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
