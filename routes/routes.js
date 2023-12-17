const express = require('express');
const router = express.Router();

// GET - controllers/auth
const loadDepartmentsFromDB = require('../controllers/auth/departments');
const logout = require('../controllers/auth/logout');
const isLogIn = require('../controllers/auth/isLogIn');
const isAdmin = require('../controllers/auth/isAdmin');
const isAccess = require('../controllers/auth/isAccess');

// GET - controllers/admin
const adminSelect = require('../controllers/admin/adminSelect');

// GET - controllers/profile
const profileSelect = require('../controllers/profile/profileSelect');

// POST - controllers/auth
const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');

// POST - controllers/admin
const adminUpdate = require('../controllers/admin/adminUpdate');
const adminDelete = require('../controllers/admin/adminDelete');
const adminConfirm = require('../controllers/admin/adminConfirm');

// POST - controllers/profile
const profileUpdate = require('../controllers/profile/profileUpdate');
const departmentAccess = require('../controllers/profile/departmentAccess');



// GET

// start page
router.get('/start', isLogIn, isAdmin, adminSelect, isAccess, (req, res) => {
    if (req.user) {
        const title = "WRO Dirks App | Start Page";
        const admin = req.admin;
        const pageName = "Home page";
        const department = req.department;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        res.render('start', {title, pageName, admin, unconfirmedSumNo, department})
    } else {
        res.redirect('/')
    }
});

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

// admin page
router.get('/admin', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const title = "WRO Dirks App | Admin panel";
        const pageName = "Admin panel";
        const pageTitle = "Panel zarządzania kontami i uprawnieniami";
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo})
    } else {
        res.redirect('/start')
    }
});

router.get('/unconfirmedUsers', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const title = "WRO Dirks App | Admin panel";
        const pageName = "Admin panel";
        const pageTitle = `Niepotwierdzone konta (${req.unconfirmedUsers.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const unconfirmedUsers = req.unconfirmedUsers;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, unconfirmedUsers})
    } else {
        res.redirect('/start')
    }
});

router.get('/confirmedUsers', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const title = "WRO Dirks App | Admin panel";
        const pageName = "Admin panel";
        const pageTitle = `Potwierdzone konta (${req.confirmedUsers.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const confirmedUsers = req.confirmedUsers;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, confirmedUsers})
    } else {
        res.redirect('/start')
    }
});

router.get('/unconfirmedAccesses', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const title = "WRO Dirks App | Admin panel";
        const pageName = "Admin panel";
        const pageTitle = `Niepotwierdzone działy (${req.unconfirmedAccesses.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const unconfirmedAccesses = req.unconfirmedAccesses;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, unconfirmedAccesses})
    } else {
        res.redirect('/start')
    }
});

router.get('/confirmedAccesses', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const title = "WRO Dirks App | Admin panel";
        const pageName = "Admin panel";
        const pageTitle = `Potwierdzone działy (${req.confirmedAccesses.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const confirmedAccesses = req.confirmedAccesses;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, confirmedAccesses})
    } else {
        res.redirect('/start')
    }
});

// profile
router.get('/profile', isLogIn, isAdmin, adminSelect, profileSelect, (req, res) => {
    if (req.user) {
        const title = "WRO Dirks App | Profile";
        const pageName = "Profile";
        const admin = req.admin;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const { user, first_name, last_name } = req.userInfo[0];
        const departmentConfirmed = req.departmentConfirmed;
        const departmentUnconfirmed = req.departmentUnconfirmed;
        const departmentWithoutAccess = req.departmentWithoutAccess;
        res.render('profile', {title, pageName, admin, unconfirmedSumNo, user, first_name, last_name, departmentConfirmed, departmentUnconfirmed, departmentWithoutAccess})
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

// admin
// confirm
router.post('/admin/adminConfirm', adminConfirm);
// update
router.post('/admin/adminUpdate', adminUpdate);
// delete
router.post('/admin/adminDelete', adminDelete);

// profile
// update account
router.post('/profile/profileUpdate', profileUpdate);
// access to departments 
router.post('/profile/departmentAccess', departmentAccess);


module.exports = router;