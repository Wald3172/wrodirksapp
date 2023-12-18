const express = require('express');
const router = express.Router();

const loadDepartmentsFromDB = require('../controllers/auth/departments');
const logout = require('../controllers/auth/logout');
const isLogIn = require('../controllers/auth/isLogIn');
const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');

// GET

// login page
router.get('/login', isLogIn, (req, res) => {
    if (!req.user) {
        const title = "WRO Dirks App | Logowanie";
        res.render('login', {title})
    } else {
        res.redirect('/start')
    }
});

// register page
router.get('/register', loadDepartmentsFromDB, isLogIn, (req, res) => {
    if (!req.user) {
        const title = "WRO Dirks App | Rejestracja";
        const department = req.department;
        res.render('register', {title, department})
    } else {
        res.redirect('/start')
    }
});

// logout
router.get('/logout', logout);

// POST

// login
router.post('/auth/login', login);
// register
router.post('/auth/register', register);


module.exports = router;