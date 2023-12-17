const express = require('express');
const path = require('path');
const Router = require('./routes/routes');
const cookie = require('cookie-parser');
const isLogIn = require('./controllers/auth/isLogIn');
const hbs = require('hbs');
const PORT = process.env.PORT || 8080;


const app = express();

// use static files from 'public'
const publicDirectory = path.join(__dirname, '/public');
app.use(express.static(publicDirectory));

// use hbs
app.set('view engine', 'hbs');
app.set('views', 'views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(cookie());
app.use(express.urlencoded({ extended: false }));

// routes
// home page
app.get('/', isLogIn, (req, res) => {
    if (!req.user) {
        const title = "WRO Dirks App";
        res.render('index', {title})
    } else {
        res.redirect('/start')
    }
});

// other routes
app.use(Router);
// app.use('/auth', Router);

// 404: page not found
app.use((req, res) => {
    const title = "WRO Dirks App | Błąd 404";
    res.status(404);
    res.render('error', {title})
});

// start app
const startApp = async () => {
    try {
        app.listen(PORT, () => console.log(`--- App is working`));

        // цикличное выполнение функции - можно использовать для auto report 
        // setInterval(() => {
        //     sendMail();
        // }, "2000");
    } catch (error) {
        console.log(`--- Connection error: ${error}`);
    }
}

startApp();


// async function startApp() {
//   let conn;
//   try {

// 	conn = await pool.getConnection();
//     const rows = await conn.query("SELECT * FROM testDB.testTable");
//     console.log(rows);

// 	// rows: [ {val: 1}, meta: ... ]

// 	// const res = await conn.query("SELECT * FROM testDB.testTable WHERE id = 1");
// 	// res: { affectedRows: 1, insertId: 1, warningStatus: 0 }
//     // console.log(res);

//   } catch (err) {
//     throw err;
//   } finally {
// 	if (conn) conn.release(); //release to pool
//     //if (conn) return conn.end(); 
//   }
// }

// startApp();
