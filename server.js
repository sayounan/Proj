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

require('dotenv').config();

const users = [];

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, 'public', '/index.html'));
    } else {
        res.redirect('/login');
    }
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Index page
app.get('/index', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

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

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    users.push({ username, password: hashedPassword });
    res.redirect('/login'); // Redirect to login after signup
});

app.post('/', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login'
}));

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
