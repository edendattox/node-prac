const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log("error: could not connect to MongoDB: err"));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // ** query operators ** //
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // ** logical operators ** //
  // or
  // and

  const courses = await Course.find()
    .or([{ author: "Mosh" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .count();
  // .select({ name: 1, tags: 1 });

  console.log(courses);
}

getCourses();
