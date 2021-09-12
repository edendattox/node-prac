const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsBD", {
  useNewUrlParser: true,
});

/**
 *  Fruits collections
 * */

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit",
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 5,
  review: "I love kiwi",
});

const orange = new Fruit({
  name: "orange",
  rating: 8,
  review: "I love orange",
});

const banana = new Fruit({
  name: "banana",
  rating: 10,
  review: "I love banana",
});

Fruit.insertMany([kiwi, orange, banana], (err) => {
  if (err) {
    new Error(err);
  } else {
    console.log("Everything is working fine");
  }
});

Fruit.find((err, fruits) => {
  if (err) {
    new Error(err);
  } else {
    mongoose.connection.close();
    fruits.forEach((v) => {
      console.log(v.name);
    });
  }
});

// fruit.save();
/**
 *  people collections
 * */

// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "mohan",
//   age: 17,
// });

// console.log("server started");

// person.save();
