const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

const PORT = 3000;

// Routes
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
// const ordersRouter = require("./routes/orders");

const api = process.env.API_URL;

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Routers
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRouter);
// app.use(`/${api}/orders`, ordersRouter);

// Connecting to the database
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`${err}`));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
