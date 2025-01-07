import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }, 
    duration : {
        type : String,
    },
    fees : {
        type : String,
    },
    charge : {
        type : Number,
    }
});

const CourseModel = mongoose.models.courses || mongoose.model('courses', courseSchema);

export default CourseModel;