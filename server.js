const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
require('dotenv').config();

const db = require('./models');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public/'));


app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 15 * 60 * 1000
    }
}));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// html routes
require('./controllers/html/login-controller')(app);
require('./controllers/html/profile-controller')(app);

// api routes
require('./controllers/api/user-controller')(app);


db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT: ' + PORT);
    });
});