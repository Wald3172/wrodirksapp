const pool = require('../../config/dbConfigOrder');

const selectPoints = async (req, res, next) => {

    let conn;

    try {
        conn = await pool.getConnection();

        const points = await conn.query("SELECT * FROM checklist_base");

        req.points = points;

        if (conn) conn.end();
        next();

    } catch (error) {
        console.log(error);
        next();
    }


}

module.exports = selectPoints;