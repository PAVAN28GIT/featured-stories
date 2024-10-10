const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

// database url
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(()=>{
    console.log("connected to featured stories db");
})
.catch((err)=>{
    console.log("failed to connect to database");
})

module.exports = mongoose.connection;

