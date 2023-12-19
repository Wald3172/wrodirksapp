const pool = require('../../config/dbConfigUser');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");

const departmentAccess = async (req, res) => {

    // data from req.body
    const { department } = req.body;

    if (!department) {
        return res.redirect('/profile')
    } 


    if (req.cookies.userSave) {

        let conn;

        try {
            // verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.userSave, process.env.JWT_SECRET);
            
            conn = await pool.getConnection();

            if (typeof(department) === 'string') {
                conn.query("INSERT INTO access (user_id, department) VALUES (?, ?)", [decoded.id, department]);
            } else {
                department.forEach(element => {
                    conn.query("INSERT INTO access (user_id, department) VALUES (?, ?)", [decoded.id, element]);
                }); 
            }

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

module.exports = departmentAccess;