const pool = require('../../config/dbConfigOrder');

const changePoint = async (req, res) => {

    let { id, title, info, monday, tuesday, wednesday, thursday, friday, saturday, sunday, first_shift, second_shift, one_shift, time_hour, planner_zl, planner_tr } = req.body;

    console.log(req.body);

    if (monday === undefined) {monday = '0'};
    if (tuesday === undefined) {tuesday = '0'};
    if (wednesday === undefined) {wednesday = '0'};
    if (thursday === undefined) {thursday = '0'};
    if (friday === undefined) {friday = '0'};
    if (saturday === undefined) {saturday = '0'};
    if (sunday === undefined) {sunday = '0'};

    if (first_shift === undefined) {first_shift = '0'};
    if (second_shift === undefined) {second_shift = '0'};
    if (one_shift === undefined) {one_shift = '0'};

    if (planner_zl === undefined) {planner_zl = '0'};
    if (planner_tr === undefined) {planner_tr = '0'};

    console.log(planner_zl);

    let conn;

    try {
        conn = await pool.getConnection();
        await conn.query("UPDATE checklist_base SET title = ?, info = ?, monday = ?, tuesday = ?, wednesday = ?, thursday = ?, friday = ?, saturday = ?, sunday = ?, first_shift = ?, second_shift = ?, one_shift = ?, time_hour = ?, planner_zl = ?, planner_tr = ? WHERE id = ?", [title, info, monday, tuesday, wednesday, thursday, friday, saturday, sunday, first_shift, second_shift, one_shift, time_hour, planner_zl, planner_tr, id]);

        return res.redirect('/order/checklist/setting'); 

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
    }
}


module.exports = changePoint;