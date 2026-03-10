const mongoose = require('mongoose');


const mongoURI = "mongodb://localhost:27017/inotebook";
// catch(err => console.log(err));

 async function connectToMongo(){
    try{
    await mongoose.connect(mongoURI);
    console.log("connect to mongo successfully"); 
}catch(err){
    console.log(err)
}

}

module.exports = connectToMongo;
