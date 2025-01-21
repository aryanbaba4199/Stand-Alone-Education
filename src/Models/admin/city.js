import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityName : {
        type : String,
        
    },
    state : {
        type : String,

    },
    cityCode : {
        code : Number,

    }
});

const CityModel = mongoose.models.cities || mongoose.model('cities', citySchema);

export default CityModel;