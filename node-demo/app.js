const express = require("express");
const morgan = require("morgan");
const config = require("config");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use("/api/courses", courses);
app.use("/", home);

console.log("Application name: " + config.get("name"));
console.log("Mail Server name: " + config.get("mail.host"));
// console.log("Mail Server password: " + config.get("mail.password"));

console.log(app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled");
}

app.use(logger);

app.use(auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
