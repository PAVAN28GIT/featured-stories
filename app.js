const express = require("express");
const app = express();

const path = require("path");
const cookiParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// middlewares
app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookiParser());



app.get("/" , (req , res)=>{
    res.render("index");
})

app.get("/signup" , (req,res)=>{
    res.render("signup");
});

app.get("/profile" , (req, res)=>{
    res.render("profile");
});

app.get("/posts" , (req, res)=>{
    res.render("posts");
});

app.get("/update" , (req, res)=>{
    res.render("update");
});

app.listen(5001);

