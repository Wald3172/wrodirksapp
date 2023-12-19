const express = require('express');
const router = express.Router();
const version = require('../config/version');

const isLogIn = require('../controllers/auth/isLogIn');
const isAdmin = require('../controllers/auth/isAdmin');
const isAccess = require('../controllers/auth/isAccess');
const adminSelect = require('../controllers/admin/adminSelect');

const authRouter = require('./authRouter');
const adminRouter = require('./adminRouter');
const profileRouter = require('./profileRouter');
const orderRouter = require('./orderRouter');

// start page
router.get('/start', isLogIn, isAdmin, adminSelect, isAccess, (req, res) => {
    if (req.user) {
        const title = "WRO Dirks App | Start Page";
        const admin = req.admin;
        const pageName = "Home page";
        const department = req.department;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        res.render('start', {title, pageName, admin, unconfirmedSumNo, department, version})
    } else {
        res.redirect('/')
    }
});

// Routes
router.use(authRouter);
router.use(adminRouter);
router.use(profileRouter);
router.use(orderRouter);

module.exports = router;