const pool = require('../../config/db_users-config');
const bcrypt = require('bcryptjs');
const checkPassword = require('../../helpers/checkPassword');
const registrationMail = require('../../mails/registerMail');

const register = async (req, res) => {

    // data from req.body
    let { firstName, lastName, email, password, passwordConfirm, department } = req.body;

    // preparing data
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();

    // departments
    let conn;

    try {
        conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM department ORDER BY short_name");
        req.department = result;
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
    }

    // if checkboxes not checked
    if (!department) {
        // back to auth/register with error message
        return res.render('register', {
            errorMsg: 'Wybierz co najmniej jeden dział',
            department: req.department,
            inputValueFirstName: firstName,
            inputValueLastName: lastName,
            inputValueEmail: email
        });
    } 

    // check if the user is in the database
    try {

        conn = await pool.getConnection();

        const selectDepartment = await conn.query("SELECT * FROM department ORDER BY short_name");

        req.department = selectDepartment;

        const result = await conn.query("SELECT email FROM user WHERE email = ?", [email])

        // user is in database
        if (result.length > 0) {
            return res.render('register', {
                errorMsg: 'Użytkownik o tym adresie e-mail jest już zarejestrowany',
                department: req.department,
                inputValueFirstName: firstName,
                inputValueLastName: lastName,
                inputValueEmail: email
            });
        // is the password correct
        } else if (checkPassword(password) == `Password isn't correct`) {
            return res.render('register', {
                errorMsg: 'Hasło powinno zawierać: małe litery, duże litery, cyfry oraz znaki specjalne',
                department: req.department,
                inputValueFirstName: firstName,
                inputValueLastName: lastName,
                inputValueEmail: email
            });
        // are passwords a match
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                errorMsg: 'Hasła się nie zgadzają',
                department: req.department,
                inputValueFirstName: firstName,
                inputValueLastName: lastName,
                inputValueEmail: email
            }); 
        // is email at dirks-group.de
        } else if (email.slice(-15) !== '@dirks-group.de') {
            return res.render('register', {
                errorMsg: 'Podany email nie jest @dirks-group.de',
                department: req.department,
                inputValueFirstName: firstName,
                inputValueLastName: lastName,
                inputValueEmail: email
            }); 
        // save user in the database
        } else {
            // hash password
            const hashedPassword = await bcrypt.hash(password, 8);

            // create username
            const user = email.slice(0, email.length-15);

            // to database 'user'
            await conn.query("INSERT INTO user (user, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)", [user, firstName, lastName, email, hashedPassword]);

            // user_id from 'user'
            const user_id = await conn.query("SELECT id FROM user WHERE user = ?", [user]);
            
            // to database 'access'
            if (typeof(department) === 'string') {
                conn.query("INSERT INTO access (user_id, department) VALUES (?, ?)", [user_id[0].id, department]);
            } else {
                department.forEach(element => {
                    conn.query("INSERT INTO access (user_id, department) VALUES (?, ?)", [user_id[0].id, element]);
                }); 
            }

            // send mail to the admin group
            registrationMail(user, firstName, lastName, email, department);

            // info 'success'
            return res.render('register', {
                successMsg: 'Konto zostało utworzone. Po potwierdzeniu przez administratora będzie nadany dostęp do aplikacji.',
                department: req.department
            }); 

        }

    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.end();
    }

}

module.exports = register;