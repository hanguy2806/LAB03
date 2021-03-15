const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = mongoose.model('Student');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
  // ????
    Student.findOne({studentNumber: req.body.studentNumber}, (err, student) => {

        if (err) { return getErrorMessage(err); }
        req.student=student;
	console.log(student);
    }).then( function () 
    {
        course.students.push(req.student);        
        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};
//
exports.list = function (req, res) {
    Course.find().sort('-created').populate('students', 'firstName lastName').exec((err, courses) => {
        if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
               res.status(200).json(courses);
            }
        });
};

exports.read = function (req, res) {
    res.status(200).json(req.course);
};

exports.update = function (req, res) {
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section=req.body.section;
    course.semester=req.body.semester;

    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};

exports.delete = function (req, res) {
    const course = req.course;
    course.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};

exports.courseByID = function (req, res, next, id) {
    Course.findById(id).populate('students', 'firstName lastName').exec((err, course) => 
    {if (err) return next(err);
    if (!course) return next(new Error('Failed to load course '+ id));
            req.course = course;
            next();
    });
};

exports.findStudentsByCourseId = function (req, res){
    Student.find({ courses : req.params.courseId })
	.exec(function (err, students) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Student not found with given course Id " + req.params.courseId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Student with given course Id " + req.params.courseId
			});
		}
			
		res.send(students);
	});
};

exports.findCoursesByStudentId = function (req, res){
    Course.find({ students : req.params.studentId })
	.exec(function (err, courses) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Courses not found with given Student Id " + req.params.studentId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Course with given Student Id " + req.params.studentId
			});
		}
			
		res.send(courses);
	});
   
};

//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
// exports.hasAuthorization = function (req, res, next) {
//     if (req.article.creator.id !== req.id) {
//         return res.status(403).send({
//             message: 'User is not authorized'
//         });
//     }
//     next();
// };
