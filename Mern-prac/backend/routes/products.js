const Product = require("../models/product");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  if (!products.length) return res.status(404).json({ success: false });

  res.send(products);
});

router.post("/", async (req, res) => {
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

module.exports = router;
