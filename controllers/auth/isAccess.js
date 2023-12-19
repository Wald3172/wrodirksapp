const pool = require('../../config/dbConfigUser');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");

const isAccess = async (req, res, next) => {

    if (req.cookies.userSave) {
        try {
            // verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, process.env.JWT_SECRET);
            // check if the user still exist
            let conn;
            conn = await pool.getConnection();
            const result = await conn.query("SELECT department, full_name FROM access INNER JOIN department ON department.short_name = access.department WHERE user_id = ? and access_confirmed = 1", [decoded.id]);

            if (conn) conn.end();

            if (!result) {
                next();
            }

            req.department = result;

            next();
            
        } catch (error) {
            console.log(error);
            next();
        } 
    } else {
        next();
    }

}

module.exports = isAccess;