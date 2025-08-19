const mongoose = require("mongoose");
const Live_url = "mongodb+srv://hariom:Hariom123@cluster0.uqhrhpm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
   //  return mongoose.connect('mongodb://127.0.0.1:27017/coursebooking')
    return mongoose.connect(process.env.LIVE_URL)

     .then(() => {
      console.log("Database Connection Successful ");
     })
     .catch((error) => {
        console.log(error);
     });
};

module.exports = connectDB;
