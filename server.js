var app, bodyParser, config, controllers, express, expressLayouts, morgan, path, mongoose, mongooseAutoIncrement;

express = require("express");
bodyParser = require("body-parser");
expressLayouts = require("express-ejs-layouts");
morgan = require("morgan");
path = require("path");

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

mongoose.connect("mongodb://username:password@ds035260.mongolab.com:35260/teste");

mongoose.connection.on('connected', function () {
  console.log('conectado');
  require("./app/models/usuario");
});

mongoose.connection.on('error', function (err) {
  console.log('erro');
  console.log(err);
});

mongooseAutoIncrement.initialize(mongoose.connection);

app = express();

controllers = {
  index: require('./app/controllers/index')
};

/*!
 * Configurando a engine de views
 */
app.set('views', path.normalize(__dirname + '/app/views'));
app.set('view engine', 'ejs');
app.set('layout', path.normalize(__dirname + '/app/layouts/layout'));

app.use(expressLayouts);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios', controllers.index);

app.listen(3000);