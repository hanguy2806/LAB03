const students = require("../../app/controllers/students.server.controller");
const courses = require("../../app/controllers/courses.server.controller");

module.exports = function (app) {
  app
    .route("/api/courses")
    .get(courses.list)
    .post(students.requiresLogin, courses.create);

  app
    .route("/api/courses/:courseId")
    .get(courses.read)
    .put(students.requiresLogin, courses.hasAuthorization, courses.update)
    .delete(students.requiresLogin, courses.hasAuthorization, courses.delete);

  app
    .route("/api/courses/student/:studentNumber")
    .get(courses.findCoursesByStudentNumber);
  //add student to a course
  app
    .route("/api/courses/:courseId/:studentId")
    .put(courses.addStudentToACourse1);

  app.param("courseId", courses.courseByID);
};
