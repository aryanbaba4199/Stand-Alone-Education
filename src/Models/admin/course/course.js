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
    }, 
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category", // This references the Category model
        required : true,
    }, 
    subCategory : {
        type : String,
    }
});

const CourseModel = mongoose.models.courses || mongoose.model('courses', courseSchema);

export default CourseModel;