const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(courses.list)
            .post(students.requiresLogin, courses.create);
      
        app.route('/api/courses/:courseId')
            .get(courses.read)
            .put(students.requiresLogin, courses.update)
            .delete(students.requiresLogin, courses.delete);

        app.get('/api/students/course/:courseId', courses.findStudentsByCourseId);

        app.get('/api/courses/student/:studentId', courses.findCoursesByStudentId);
      
        app.param('courseId', courses.courseByID);
};
