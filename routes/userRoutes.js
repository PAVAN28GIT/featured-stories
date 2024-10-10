const express = require('express');
const router = express.Router();


const userModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Register GET
router.get('/register', (req, res) => {
    res.render('register', { message: null });
});

// Register POST
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    let user = await userModel.findOne({ email: email });
    if (user) return res.render('register', { message: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
        name,
        email,
        password: hash
    });

    // Create JWT token
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET); // Use your JWT secret
    res.cookie('token', token);

    res.render('register', { message: 'Account created' });
});

// Login GET
router.get('/login', (req, res) => {
    res.render('login', { message: null });
});

// Login POST
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    let user = await userModel.findOne({ email: email });
    if (!user) return res.render('login', { message: 'User does not exist' });

    const result = await bcrypt.compare(password, user.password);
    if (result) {
        // Create JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.cookie('token', token);

        return res.render('profile', { user });
    } else {
        return res.render('login', { message: 'Incorrect email or password' });
    }
});

module.exports = router;
