const mongoose = require('mongoose');


const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
// catch(err => console.log(err));

 async function connectToMongo(){
    try{
    await mongoose.connect(mongoURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,
      });
    console.log("connect to mongo successfully"); 
}catch(err){
    console.log(err)
}

}

module.exports = connectToMongo;
