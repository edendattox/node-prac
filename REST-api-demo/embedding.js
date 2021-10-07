const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourse() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $set: {
        "author.name": "John Smith",
      },
    }
  );
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

removeAuthor("61403f2ccaa45f8203f5698d", "61403fda0fff7e3ccc2f50bf");
// addAuthor("61403f2ccaa45f8203f5698d", new Author({ name: "Amy" }));

// createCourse("Node Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);
// updateAuthor("614038a474d6ed56f0c656fd");
