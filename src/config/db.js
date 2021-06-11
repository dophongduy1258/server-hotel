require('dotenv').config();


const mongoose = require('mongoose');

// CONNECT MONGOOSE

const connectDB = async () =>{
  try{
   await mongoose.connect(
      // `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.gz2yk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      // 'mongodb+srv://dophongduy1258:0934513226@Duy@myhotelserver.8xy9j.mongodb.net/myHotelServer?retryWrites=true&w=majority',
      `mongodb+srv://${process.env.name}:${process.env.pass}@myserver.xvp6u.mongodb.net/${process.env.nameDB}?retryWrites=true&w=majority`,
      {
      useCreateIndex:true,
      useNewUrlParser:true,
      useUnifiedTopology:true,
      useFindAndModify:false
      }
  )
   console.log('Connect mongoDB success !'); 
  }catch(error){
      console.log(error.message);
      process.exit(1);
  }
}
  
  // console.log(process.env.ADMIN);
const db = mongoose.connection;
db.on("error",console.error.bind(console,"MongoDB connection error"));

module.exports = connectDB;




