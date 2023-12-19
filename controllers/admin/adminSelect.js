const pool = require('../../config/dbConfigUser');

const adminSelect = async (req, res, next) => {

    let conn;

    try {
        conn = await pool.getConnection();

        // access to app
        // unconfirmed accounts
        const unconfirmedUsers = await conn.query("SELECT id, user, role FROM user WHERE account_confirmed = 0 ORDER BY user");
        // confirmed accounts
        const confirmedUsers = await conn.query("SELECT id, user, role FROM user WHERE account_confirmed = 1 ORDER BY user");

        // access to departments
        // unconfirmed accesses to departments
        const unconfirmedAccesses = await conn.query("SELECT access.id, user, department, access.role FROM access INNER JOIN user ON user.id = access.user_id WHERE access_confirmed = 0 ORDER BY user, department");
        // confirmed accesses to departments
        const confirmedAccesses = await conn.query("SELECT access.id, user, department, access.role FROM access INNER JOIN user ON user.id = access.user_id WHERE access_confirmed = 1 ORDER BY user, department");

        req.unconfirmedUsers = unconfirmedUsers; 
        req.confirmedUsers = confirmedUsers; 
        req.unconfirmedAccesses = unconfirmedAccesses; 
        req.confirmedAccesses = confirmedAccesses; 
        req.howMany = {
            unconfirmedUsersNo: unconfirmedUsers.length,
            confirmedUsersNo: confirmedUsers.length,
            unconfirmedAccessesNo: unconfirmedAccesses.length,
            confirmedAccessesNo: confirmedAccesses.length,
        }

        if (unconfirmedUsers.length + unconfirmedAccesses.length >= 100) {
            req.unconfirmedSumNo = "99+"
        } else {
            req.unconfirmedSumNo = unconfirmedUsers.length + unconfirmedAccesses.length
        }

        if (conn) conn.end();
        next();

    } catch (error) {
        console.log(error);
        next();
    } 
}

module.exports = adminSelect;