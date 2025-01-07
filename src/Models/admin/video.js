import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    }
});

const VideoModel = mongoose.models.videos || mongoose.model('videos', videoSchema);

export default VideoModel;