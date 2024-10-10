const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userid : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // user is the model name
    },
    title : String,
    body : String,

}, { timestamps: true });

module.exports = mongoose.model("Post" , postSchema);

