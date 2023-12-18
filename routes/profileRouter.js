const express = require('express');
const router = express.Router();
require('dotenv').config();

const isLogIn = require('../controllers/auth/isLogIn');
const isAdmin = require('../controllers/auth/isAdmin');
const adminSelect = require('../controllers/admin/adminSelect');

const profileSelect = require('../controllers/profile/profileSelect');
const profileUpdate = require('../controllers/profile/profileUpdate');
const departmentAccess = require('../controllers/profile/departmentAccess');

// GET
const title = "WRO Dirks App | Profile";
const pageName = "Profile"
const version = process.env.APP_VERSION;

router.get('/profile', isLogIn, isAdmin, adminSelect, profileSelect, (req, res) => {
    if (req.user) {
        const admin = req.admin;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const { user, first_name, last_name } = req.userInfo[0];
        const departmentConfirmed = req.departmentConfirmed;
        const departmentUnconfirmed = req.departmentUnconfirmed;
        const departmentWithoutAccess = req.departmentWithoutAccess;
        res.render('profile', {title, pageName, admin, unconfirmedSumNo, user, first_name, last_name, departmentConfirmed, departmentUnconfirmed, departmentWithoutAccess, version})
    } else {
        res.redirect('/start')
    }
});

// POST 

// update account
router.post('/profile/profileUpdate', profileUpdate);
// access to departments 
router.post('/profile/departmentAccess', departmentAccess);

module.exports = router;