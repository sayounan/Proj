/*
Created by Sari I. Younan
04/05/2024 16:31:45
server.js
*/

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./Users');

require('dotenv').config();

const users = [];

// const router = express.Router();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(express.json())

app.get('/',
    function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/sheet');
    } else {
        res.redirect('/login');
    }
});

app.post('/signup',
    (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'});
    } else {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password // Password hashing is handled in the User model
        });

        newUser.save().then(() => {
            res.json({success: true, msg: 'Successfully created new user.'});
        }).catch(err => {
            res.json({success: false, msg: 'Username already exists.', error: err.message});
        });
    }
});

app.post('/signin',
    async (req, res) => {
    console.log("Signin route hit with username:", req.body.username);
    try {
        const user = await User.findOne({ username: req.body.username })
            .select('+password').exec();
        if (!user) {
            console.log("User not found:", req.body.username);
            return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        }

        console.log("User found, comparing password for user:", req.body.username);
        const isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            console.log("Password matches for user:", req.body.username);
            const userToken = {id: user._id, username: user.username};
            const token = jwt.sign(userToken, process.env.SECRET_KEY);
            res.json({ success: true, token: 'JWT ' + token });
        } else {
            console.log("Password does not match for user:", req.body.username);
            res.status(401).send({ success: false, msg: 'Authentication failed.' });
        }
    } catch (err) {
        console.error("Error in signin route:", err);
        res.status(500).send({success: false, msg: 'Authentication failed.', error: err.message});
    }
});

const PORT = process.env.PORT || 8080;

passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect username or password' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    const user = users.find(u => u.username === username);
    done(null, user);
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.post('/add-entry', checkAuthenticated, (req, res) => {
    const { title, amount, description } = req.body;
    console.log(title, amount, description);
    res.json({ message: 'Entry added successfully', data: { title, amount, description }})
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
