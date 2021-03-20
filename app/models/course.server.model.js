const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
		unique: true,
		required: 'course code is required',
        trim: true
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    },
    section: {
        type: String, default: '',
        trim: true
    },
    semester:String,
    studentList:[
        {
            type: Schema.ObjectId,
            ref: 'Student'
        }
    ],
    creator: {
        type: Schema.ObjectId,
        ref: 'Student'
    }    
});
mongoose.model('Course', CourseSchema);
