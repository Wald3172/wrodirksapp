const pool = require('../../config/dbConfigUser');

const loadDepartmentsFromDB = async (req, res, next) => {

    let conn;

    try {

        conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM department ORDER BY short_name");

        req.department = result;
        next();
        
    } catch (error) {
        
        console.log(error);
        next();

    } finally {
        if (conn) conn.release();
    }

}

module.exports = loadDepartmentsFromDB;


