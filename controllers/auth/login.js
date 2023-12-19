const pool = require('../../config/dbConfigUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    // data from request body
    let { user, password } = req.body;

    // check user in the database
    let conn;

    try {
        conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM user WHERE user = ?", [user]);
        // user is not in the database
        if (result.length == 0) {
            return res.render('login', {
                errorMsg: 'Użytkownik z tym loginem nie istnieje',
                userValue: user,
            });  
        // account has not been confirmed
        } else if (result[0].account_confirmed == 0) {
            return res.render('login', {
                errorMsg: 'Konto nie zostało potwierdzone przez administratora',
                userValue: user,
            }); 
        // user is in the database, but password is incorrect
        } else if (!await bcrypt.compare(password, result[0].password)) {
            return res.render('login', {
                errorMsg: 'Nieprawidłowe hasło',
                userValue: user,
            }); 
        // if login and password are correct
        } else {
            // id from database
            const id = result[0].id;
            // creating json web token
            const token = jwt.sign( { id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });
            // creating cookie options
            const cookieOptions = {
                expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
            }
            // success
            res.cookie('userSave', token, cookieOptions);
            res.status(200).redirect('/start');
        }


    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release();
    }
}

module.exports = login;