const express = require('express');
const router = express.Router();
const version = require('../config/version');

const isLogIn = require('../controllers/auth/isLogIn');
const isAdmin = require('../controllers/auth/isAdmin');

const adminSelect = require('../controllers/admin/adminSelect');
const adminUpdate = require('../controllers/admin/adminUpdate');
const adminDelete = require('../controllers/admin/adminDelete');
const adminConfirm = require('../controllers/admin/adminConfirm');

// GET
const title = "WRO Dirks App | Admin panel";
const pageName = "Admin panel";

router.get('/admin', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const pageTitle = "Panel zarządzania kontami i uprawnieniami";
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, version})
    } else {
        res.redirect('/start')
    }
});

router.get('/admin/unconfirmedUsers', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const pageTitle = `Niepotwierdzone konta (${req.unconfirmedUsers.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const unconfirmedUsers = req.unconfirmedUsers;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, unconfirmedUsers, version})
    } else {
        res.redirect('/start')
    }
});

router.get('/admin/confirmedUsers', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const pageTitle = `Potwierdzone konta (${req.confirmedUsers.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const confirmedUsers = req.confirmedUsers;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, confirmedUsers, version})
    } else {
        res.redirect('/start')
    }
});

router.get('/admin/unconfirmedAccesses', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const pageTitle = `Niepotwierdzone działy (${req.unconfirmedAccesses.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const unconfirmedAccesses = req.unconfirmedAccesses;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, unconfirmedAccesses, version})
    } else {
        res.redirect('/start')
    }
});

router.get('/admin/confirmedAccesses', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const pageTitle = `Potwierdzone działy (${req.confirmedAccesses.length})`;
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const confirmedAccesses = req.confirmedAccesses;
        res.render('admin', {title, pageName, pageTitle, admin, howMany, unconfirmedSumNo, confirmedAccesses, version})
    } else {
        res.redirect('/start')
    }
});

// POST

// confirm
router.post('/admin/adminConfirm', adminConfirm);
// update
router.post('/admin/adminUpdate', adminUpdate);
// delete
router.post('/admin/adminDelete', adminDelete);

module.exports = router;