const { Category } = require("../models/category");
const { Product } = require("../models/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const products = await Product.find().populate("category"); //.populate("category");
  if (!products.length) return res.status(404).json({ success: false });

  res.send(products);
});

router.get("/:id", async (req, res) => {
  const products = await Product.findById(req.params.id).populate("category");
  if (!products) return res.status(404).json({ success: false });

  res.send(products);
});

router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid Product Id");
  }
  const category = await Category.findById(req.body.category);

  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    res.status(400).send("The product cannot be created");
  }

  res.send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category)
        return res
          .status(200)
          .json({ success: true, message: "product is deleted" });
      else
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) res.status(500).json({ success: false });

  res.send({
    count: productCount,
  });
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const productCount = await Product.find({ isFeatured: true }).limit(+count);

  if (!productCount) res.status(500).json({ success: false });

  res.send(productCount);
});

module.exports = router;
