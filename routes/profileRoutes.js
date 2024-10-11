const express = require('express');
const router = express.Router();

const cookieParser = require("cookie-parser");
const postModel = require('../models/posts-model.js');
const userModel = require('../models/user-model.js')
const jwt = require('jsonwebtoken');
const JWT = process.env.JWTKEY;

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token)res.send(404).render("login" ,  { message: 'Please log in to access this page.' });
   
    try{
        var decode = jwt.verify(token , JWT);
        var user = await userModel.findOne({email : decode.email}).populate('posts');
        if(!user) res.status(404).render('login', { message: 'Please log in to access this page.' });
        // Store user data in request object for later use in routes
        req.user = user;
        // Proceed to the next middleware/route handler
        next();
    }catch(error){
        return res.status(401).render('login', { message: 'Invalid token, Please log in again.' });
    }
};


router.get("/" ,verifyToken,(req,res)=>{
    // verify the jwt token  -> middleware function will do that 
    // if user exist in db , then render profile page showing his name 
    res.render("profile" , {user : req.user , message : null});
})

// create post
router.post("/create" ,verifyToken, async(req,res)=>{
    // verifyToken will run
    let {title , story} = req.body
    let post = await postModel.create({userid : req.user._id , title : title , body:story});
    // now after posting ... update the usersmodel
    await userModel.findByIdAndUpdate(req.user._id , {$push :{posts : post._id}} , {new : true});

    // Redirect to profile with a success message as a query parameter
    res.redirect(`/profile`);
});

// show post -> view more
router.get("/:username/:posid" , async(req ,res)=>{
    
    let post = await postModel.findOne({ _id: req.params.posid });
    if (!post) {
        console.log("post not found " , postid);
        res.redirect("/profile");  // diaplay post not found
    }   
    res.render("posts" , {post});
});


router.get("/delete/:postid", async (req, res) => {
    res.send("ey breo ")
    // console(req.params);
    // const post = await postModel.findById(req.params.postid);
    // if (!post) {
    //     return res.send("Post not found.");
    // }
    // await postModel.deleteOne({ _id: req.params.postid });

    // const userid = req.user._id; // Ensure req.user is populated by your middleware
    // var us = await User.findByIdAndUpdate(userid, { $pull: { posts: req.params.postid } });
    // console.log("Updated User:", us);
    // res.send("hey bro done deleting");
});


module.exports = router;