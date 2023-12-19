const { configDotenv } = require('dotenv');
const pool = require('../../config/dbConfigUser');

const adminDelete = async (req, res) => {

    const { user, route, department } = req.body;

    let conn;

    try {   
        conn = await pool.getConnection();

        // get user_id
        const user_id = await conn.query("SELECT id FROM user WHERE user = ?", [user]);

        //  table 'access'
        if (department) {
            // get access_id
            const access_id = await conn.query("SELECT id FROM access WHERE user_id = ? and department = ?", [user_id[0].id, department]);
            // delete access for department
            await conn.query("DELETE FROM access WHERE id = ?", [access_id[0].id]);
        //  table 'user'
        } else {
            // delete all access to the departments
            const allAccesses = await conn.query("SELECT id FROM access WHERE user_id = ?", [user_id[0].id]);

            for (i = 0; i < allAccesses.length; i++) {
                await conn.query("DELETE FROM access WHERE id = ?", [allAccesses[i].id]);
            }

            // delete user with accesses to departments
            await conn.query("DELETE FROM user WHERE user = ?", [user]);
        }

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
        return res.redirect (`/admin/${route}`);
    }
}

module.exports = adminDelete;