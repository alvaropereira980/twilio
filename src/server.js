const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const morgan = require('morgan');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./libs/handlerbar')
}));

//Middleware
app.set('view engine', '.hbs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use(require('./routes/indes.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
