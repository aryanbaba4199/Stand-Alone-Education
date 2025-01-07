import mongoose from "mongoose";

const regSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    degree : {
        type : String,
        required : true
    },
    studyIn : {
        type : String,
        required : true
    },
    address : {
        type : String,
    },
    userType : {
        type : String,
        default : 'user'
    }
});

const Users = mongoose.models.users || mongoose.model('users', regSchema);

export default Users;