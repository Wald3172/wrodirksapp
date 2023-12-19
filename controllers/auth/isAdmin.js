const pool = require('../../config/dbConfigUser');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");

const isAdmin = async (req, res, next) => {

    if (req.cookies.userSave) {
        try {
            // verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, process.env.JWT_SECRET);
            // check if the user still exist
            let conn;
            conn = await pool.getConnection();
            const result = await conn.query("SELECT role FROM user WHERE id = ?", [decoded.id]);

            if (conn) conn.end();

            if (!result) {
                next();
            }

            if (result[0].role === 'admin') {
                req.admin = result[0].role;
            }
            next();
            
        } catch (error) {
            console.log(error);
            next();
        } 
    } else {
        next();
    }

}

module.exports = isAdmin;