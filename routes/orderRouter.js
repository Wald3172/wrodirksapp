const express = require('express');
const router = express.Router();
const version = require('../config/version');

const isLogIn = require('../controllers/auth/isLogIn');
const isAdmin = require('../controllers/auth/isAdmin');
const adminSelect = require('../controllers/admin/adminSelect');

// GET
const title = "WRO Dirks App | Order";
const pageName = "Order Management";

router.get('/order', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        res.render('order', {title, pageName, admin, howMany, unconfirmedSumNo, version})
    } else {
        res.redirect('/start')
    }
});

module.exports = router;