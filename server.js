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
    } catch (error) {
        console.log(`--- Connection error: ${error}`);
    }
}

startApp();