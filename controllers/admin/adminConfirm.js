const pool = require('../../config/dbConfigUser');
const confirmedAccessMail = require('../../mails/confirmAccessMail')

const adminConfirm = async (req, res) => {

    const { user, role, route, department } = req.body;

    let conn;

    try {   
        conn = await pool.getConnection();

        // get information about user
        const userInfo = await conn.query("SELECT id, first_name, email FROM user WHERE user = ?", [user]);

        if (department) {
            // change user role in the department in the table 'access' 
            await conn.query("UPDATE access SET access_confirmed = 1, role = ? WHERE user_id = ? and department = ?", [role, userInfo[0].id, department]);
        } else {
            // change user role in the table 'user'
            await conn.query("UPDATE user SET account_confirmed = 1, role = ? WHERE id = ?", [role, userInfo[0].id]);
        }

         // send mail
        confirmedAccessMail(userInfo[0].first_name, userInfo[0].email, department.toUpperCase());

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
        return res.redirect (`/admin/${route}`);
    }

}

module.exports = adminConfirm;