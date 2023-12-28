const express = require('express');
const router = express.Router();
const version = require('../config/version');

const isLogIn = require('../controllers/auth/isLogIn');
const isAdmin = require('../controllers/auth/isAdmin');
const adminSelect = require('../controllers/admin/adminSelect');
const isAccess = require('../controllers/auth/isAccess');

const newPoint = require('../controllers/order/newPoint');
const changePoint = require('../controllers/order/changePoint');
const selectPoints = require('../controllers/order/selectPoints');

// GET
const title = "WRO Dirks App | Order";
const pageName = "Order Management";

router.get('/order', isLogIn, isAdmin, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const param = {
            title: 'Order Management Center',
            desc: 'Strona główna działu Order Management ze wszystkimi narzędziami i raportami',
            dropdown: 'Filtr',
            dropdownLink: [
                {
                    name: 'Wszystko',
                    href: '/order'
                }
            ],
            route: [
                {
                    name: 'Checklista',
                    href: '/order/checklist'
                }
            ]
        };
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        res.render('order', {title, pageName, param, admin, howMany, unconfirmedSumNo, version})
    } else {
        res.redirect('/start')
    }
});

router.get('/order/checklist', isLogIn, isAdmin, isAccess, adminSelect, (req, res) => {
    if (req.user && req.admin) {
        const param = {
            title: 'Checklista',
            desc: 'Zaznacz datę, stanowisko i zmianę, na której jesteś',
            route: [
                {
                    name: 'Punkt 1',
                    href: ''
                },
                {
                    name: 'Punkt 2',
                    href: ''
                },
                {
                    name: 'Punkt 3',
                    href: ''
                }
            ]
        };
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;

        let role = '';
        for (i=0; i < req.department.length; i++) {
            if (req.department[i].department === 'order' && req.department[i].role === 'admin') {
                role = 'admin';
            }
        }

        res.render('order_checklist', {title, pageName, param, role, admin, howMany, unconfirmedSumNo, version})
    } else {
        res.redirect('/start')
    }
});

router.get('/order/checklist/setting', isLogIn, isAdmin, isAccess, adminSelect, selectPoints, (req, res) => {
    if (req.user && req.admin) {
        const param = {
            title: 'Checklista: ustawienia',
            desc: 'Jako administrator działu Order Management możesz wprowadzać zmiany do checklisty',
        };
        const admin = req.admin;
        const howMany = req.howMany;
        const unconfirmedSumNo = req.unconfirmedSumNo;
        const points = req.points;

        let role = '';
        for (i=0; i < req.department.length; i++) {
            if (req.department[i].department === 'order' && req.department[i].role === 'admin') {
                role = 'admin';
            }
        }

        if (role === 'admin') {
            res.render('order_checklist_setting', {title, pageName, param, role, admin, howMany, unconfirmedSumNo, points, version})
        } else {
            res.redirect('/order/checklist')
        }
        
    } else {
        res.redirect('/start')
    }
});

// POST

// new point
router.post('/order/checklist/new_point', newPoint);
// change point
router.post('/order/checklist/change_point', changePoint)

module.exports = router;