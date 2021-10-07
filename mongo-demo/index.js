const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.log(`error: could not connect to MongoDB: ${err}`));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: //
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  // tags: {
  //   type: Array,
  //   validate: {
  //     isAsync: true,
  //     validator: function (value, callback) {
  //       setTimeout(() => {
  //         // Do some async work
  //         const result = value && value.length > 0;
  //         callback(result);
  //       }, 4000);
  //     },
  //     message: "A course should have at least one tag.",
  //   },
  // },
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

/**
 *  CREATE COURSE IN THE DATABASE
 */

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "Web",
    author: "Mosh",
    // tags: null,
    isPublished: true,
    price: 12.1,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    for (field in err.errors) {
      console.log(err.errors[field]);
    }
  }
}

createCourse();

/**
 *  GET COURSE FROM THE DATABASE
 */

// async function getCourses(id) {
// const pageNumber = 2;
// const pageSize = 10;

// const courses = await Course.find({ _id: id });
// .or([{ author: "Mosh" }, { isPublished: true }])
// .limit(10)
// .sort({ name: 1 })
// .count();
// .select({ name: 1, tags: 1 });
// .skip((pageNumber - 1) * pageSize)

// console.log(courses[0].price);
// }

// getCourses("613eea00a65c8df4bda3657b");

/**
 *  QUERY FIRST APPROACH TO UPDATE
 */

// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   // course.isPublished = true;
//   // course.author = "Another Author";
//   course.set({
//     isPublished: true,
//     author: "Another Author",
//   });

//   const result = await course.save();
//   console.log(result);
// }

// updateCourse("6139a3169d2f5f6f7ab306de");
// getCourses();

/**
 *  DIRECT UPDATE
 * */

// async function updateCourse(id) {
//   const result = await Course.update(
//     { _id: id },
//     {
//       $set: {
//         author: "Mosh",
//         isPublished: false,
//       },
//     }
//   );

//   console.log(result);
// }

/**
 *  FIND BY ID AND UPDATE METHOD TO UPDATE
 * */

// const updateCourse = async (id) => {
//   const course = await Course.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         author: "Jason",
//         isPublished: false,
//       },
//     },
//     { new: true }
//   );
//   console.log(course);
// };

// updateCourse("6139a3169d2f5f6f7ab306de");

/**
 *  REMOVE COURSE
 * */

// const removeCourse = async (id) => {
//   const result = await Course.deleteOne({ _id: id });
//   console.log(result);
// };

/**
 *  REMOVE COURSE BY FIND BY ID AND REMOVE
 * */

// const removeCourse = async (id) => {
//   const result = await Course.findByIdAndRemove({ _id: id });
//   console.log(result);
// };

// removeCourse("6139a3169d2f5f6f7ab306de");

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
