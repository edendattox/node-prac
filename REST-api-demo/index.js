db.products.insertOne({
  _id: 2,
  name: "Pencil",
  price: 0.8,
  stock: 12,
  reviews: [
    {
      authorName: "James",
      rating: 5,
      review: "best ever!",
    },
    {
      authorName: "john",
      rating: 3,
      review: "Awesome!",
    },
  ],
});
