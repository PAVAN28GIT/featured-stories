const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

// database url
const mongoURI = process.env.MONGO_URI;
//connect
mongoose.connect(mongoURI)
.then(() => {
    console.log("connected to featured stories db");
})
.catch((err) => {
    console.error("failed to connect to database:", err.message);
});

module.exports = mongoose.connection;
