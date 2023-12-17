const pool = require('../../config/db_users-config');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");
// const bcrypt = require('bcryptjs');

const profileSelect = async (req, res, next) => {

    if (req.cookies.userSave) {

        let conn;

        try {
            // verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, process.env.JWT_SECRET);
            
            conn = await pool.getConnection();
    
            // select user info from table 'user'
            const userInfo = await conn.query("SELECT user, first_name, last_name FROM user WHERE id = ?", [decoded.id]);
            
            // select departments from table 'access'
            const departmentConfirmed = await conn.query("SELECT department FROM access WHERE user_id = ? and access_confirmed = 1", [decoded.id]);

            const departmentUnconfirmed = await conn.query("SELECT department FROM access WHERE user_id = ? and access_confirmed = 0", [decoded.id]);
            
            // select all departments from table 'department'
            const department = await conn.query("SELECT short_name as department FROM department");


            // get departments without access
            let departmentWithoutAccess = [];

            [...departmentConfirmed, ...departmentUnconfirmed, ...department].forEach(element => {
                departmentWithoutAccess.push(element.department)
            }); 

            const getUniqElements = (arr) => {
                const occurrences = {};
                arr.forEach(el => {
                if(occurrences[el]) occurrences[el]++;
                else occurrences[el] = 1
                })
                return Object.keys(occurrences).filter(key => occurrences[key] === 1)
            }

            departmentWithoutAccess = getUniqElements(departmentWithoutAccess);

            req.userInfo = userInfo;
            req.departmentConfirmed = departmentConfirmed;  
            req.departmentUnconfirmed = departmentUnconfirmed;
            req.departmentWithoutAccess = departmentWithoutAccess;
    
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) conn.end();
            next();
        }

    } else {
        next();
    }

}

module.exports = profileSelect;