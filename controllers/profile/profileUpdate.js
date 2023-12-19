const { error } = require('console');
const pool = require('../../config/dbConfigUser');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");

const profileUpdate = async (req, res) => {

    // data from req.body
    const { user, firstName, lastName } = req.body;
    
    if (req.cookies.userSave) {

        let conn;

        try {
            // verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, process.env.JWT_SECRET);
            
            conn = await pool.getConnection();
    
            // update user info in the table 'user'
            const userInfo = await conn.query("UPDATE user SET user = ?, first_name = ?, last_name = ? WHERE id = ?", [user, firstName, lastName, decoded.id]);
    
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) conn.end();
            return res.redirect ('/profile')
        }

    } else {
        console.log(error);
    }


}

module.exports = profileUpdate;