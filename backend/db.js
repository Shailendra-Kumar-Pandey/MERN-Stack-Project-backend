const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = async()=>{
    mongoose.connect = await mongoURI;
    console.log("connect to mongo "); 
}

module.exports = connectToMongo;