const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name : String,
    email: { 
        type: String, 
        unique: true 
    },
    password : String,
    posts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' 
    }]

}, { timestamps: true });

module.exports = mongoose.model("User" , userSchema);

