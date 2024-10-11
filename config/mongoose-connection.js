const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })


let mongoURI;
if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGO_URI;
}else {
    mongoURI = process.env.MONGO_URI_DEV;
}
  

mongoose.set('strictQuery', true)
//connect
console.log("Waiting for database to connect....");
mongoose.connect(mongoURI)
.then(() => {
    console.log("connected to featured stories db");
})
.catch((err) => {
    console.error("failed to connect to database:", err.message);
});




module.exports = mongoose.connection;
