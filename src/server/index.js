const express = require('express');
const routes = require('../routes/');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const morgan = require('morgan');
const errorHandler = require('errorhandler');


module.exports = (app) => {
    
    //server
    app.set('views', path.join(__dirname, 'views'));
    app.set('port', process.env.PORT || 3000);
    //Conf motor de plantillas
    app.engine('.hbs', hbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'),'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')))

    //middlewares
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));
    
    //routes
    routes(app);

    //errorHandlers
    if ('development' === app.get('env')){
        app.use(errorHandler);
    }


    return app;
}