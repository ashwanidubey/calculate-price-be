require('dotenv').config()
const mongoose = require('mongoose');

const mongoURI= process.env.MONGO_URI


const connectToMongo = async ()=>{
   mongoose.connect(mongoURI,
      { autoIndex: false } 
    ).then(() => console.log('mongo Connected to server'));
   
}

module.exports = connectToMongo ;