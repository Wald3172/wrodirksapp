const pool = require('../../config/dbConfigUser');

const adminUpdate = async (req, res) => {

    const { user, role, route, department } = req.body;

    let conn;

    try {   
        conn = await pool.getConnection();

        if (department) {
            // get user_id
            const user_id = await conn.query("SELECT id FROM user WHERE user = ?", [user]);
            // change user role in the department in the table 'access' 
            await conn.query("UPDATE access SET role = ? WHERE user_id = ? and department = ?", [role, user_id[0].id, department]);
        } else {
            // change user role in the table 'user'
            await conn.query("UPDATE user SET role = ? WHERE user = ?", [role, user]);
        }

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
        return res.redirect (`/admin/${route}`);
    }

}

module.exports = adminUpdate;