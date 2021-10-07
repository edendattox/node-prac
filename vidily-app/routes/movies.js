const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    return res.status(400).send("Invalid genre");
  }

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(error).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("The genre with the given ID");

  genre.name = req.body.name;

  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id);

  if (!genre) return res.status(404).send("The genre with the given Id");

  res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(req.params.id);

  if (!genre) return res.status(404).send("The genre with the given ID");

  res.send(genre);
});

module.exports = router;
