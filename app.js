const express = require("express");
const app = express();

const path = require("path");
const cookiParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const JWT = process.env.JWTKEY;

// middlewares
app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookiParser());


//connect to mongodb
const db = require("./config/mongoose-connection.js");
const userModel = require("./models/user-model.js");
const postModel = require("./models/posts-model.js");


//routes
const userRoutes = require('./routes/userRoutes.js'); 



app.get("/" , (req,res)=>{
    res.render("index");
});

// creating account and login routes
app.use('/users', userRoutes); 


// app.get("/register", (req, res) => {
//     res.render("register" , {message : null});
// });

// app.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;
    
//     // Check if user already exists
//     let user = await userModel.findOne({ email: email });
//     if (user) return res.render("register", { message: "User already exists" });
    
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     user = await userModel.create({
//         name,
//         email,
//         password: hash
//     });

//     // Create JWT token
//     const token = jwt.sign({ email: email }, JWT);
//     res.cookie("token", token);

//     res.render("register", { message: "Account created" });
    
// });


// app.get("/login" , (req,res)=>{
//     res.render("login" , {message : null});
// });


// app.post("/login" , async(req,res)=>{
//     let {email , password} = req.body;

//       // Check if user already exists
//     let user = await userModel.findOne({ email: email });
//     if (!user) return res.render("register", { message: "User Does not exist" });

//     bcrypt.compare(password , user.password , function(err ,result){
//         if(result){
//                // Create JWT token
//                const token = jwt.sign({ email: user.email }, JWT);
//                res.cookie("token", token);

//                return res.render("profile" , {user});
//         } 
//         else return res.render("login" , {message : "Incorrect Email or Password"});
//     })

// });






app.get("/profile" , (req, res)=>{
    res.render("profile" , {name});
});



app.get("/posts" , (req, res)=>{
    res.render("posts");
});

app.get("/update" , (req, res)=>{
    res.render("update");
});

app.listen(5001 , ()=>{
    console.log("server running at 5001");
});

