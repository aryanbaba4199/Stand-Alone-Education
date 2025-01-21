import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    rank : {
        type : Number,
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course", // This references the Course model
        required : true,
    }
});

const VideoModel = mongoose.models.videos || mongoose.model('videos', videoSchema);

export default VideoModel;