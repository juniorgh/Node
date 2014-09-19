var _, app, bodyParser, config, controllers, express, expressLayouts, morgan, path, mongoose, mongooseAutoIncrement, session, cookieParser, flash, multiparty,passport, MongoStore, LocalStrategy;

_ = require('underscore');
multiparty = require("connect-multiparty");
flash = require('connect-flash');
cookieParser = require('cookie-parser');
session = require('express-session');
express = require("express");
bodyParser = require("body-parser");
expressLayouts = require("express-ejs-layouts");
morgan = require("morgan");
path = require("path");

passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
MongoStore = require('connect-mongo')(session);


mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

mongoose.connect("mongodb://username:password@ds035260.mongolab.com:35260/teste");

mongooseAutoIncrement.initialize(mongoose.connection);

mongoose.connection.on('connected', function (err) {
  require("./app/models/usuario");
  require("./app/models/grupo");
  require("./app/models/permissao");
  require("./app/models/vendedor");
  require("./app/models/item");
  require("./app/models/venda");

  if(err){
    console.log(err);
  } else {
    console.log('Biitch');
  }

  passport.serializeUser(function (user, done) {
    return done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    return done(null, user);
  });

// Definindo a autenticação local
passport.use('local-signup', new LocalStrategy({
  usernameField : 'login',
  passwordField : 'senha',
  passReqToCallback : true
},
function (req, login, senha, done) {
// Procedimento assíncrono
process.nextTick(function () {
  var Usuario = mongoose.model('Usuario');
// Procura um usuário pelo seu e-mail e senha, se for localizado armazena
// suas informações na sessão.
Usuario.findOne({ email: login })
.populate('grupo')
.exec(function (err, user) {
  if (err) {
    return done(err);
  }

  if (user && user.validPassword(senha)) {
    return done(null, user);
  } else {
    return done(null, false, req.flash('authError', 'Credenciais inválidas'));
  }
});
});
}));

});

mongoose.connection.on('error', function (err) {
  console.log('erro');
  console.log(err);
});

app = express();

controllers = {
  index: require('./app/controllers/index'),
  grupos: require('./app/controllers/grupo'),
  autentificacao: require('./app/controllers/autentificacao')(passport),
  permissoes: require('./app/controllers/permissao'),
  itens: require('./app/controllers/item'),
  vendedores: require('./app/controllers/vendedor'),
  vendas: require('./app/controllers/venda')
};

/*!
* Configurando a engine de views
*/
app.set('views', path.normalize(__dirname + '/app/views'));
app.set('view engine', 'ejs');
app.set('layout', path.normalize(__dirname + '/app/layouts/layout'));

app.use(function (req, res, next) {
  var locals = {
    _: _,
    usuario: req.user || {}
  };

  res.locals = _.extend(res.locals, locals);
  return next();
});

app.use(expressLayouts);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('keyboard cat'));
app.use(express.static(path.normalize(__dirname + "/public")));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'keyboard cat',
  cookie: {
    maxAge: new Date(Date.now() + 3600000)
  },
  store: new MongoStore({
    mongoose_connection: mongoose.connection,
    auto_reconnect: true
  })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(multiparty());
app.use(flash());
app.use('/usuarios', controllers.index);
app.use('/grupos', controllers.grupos);
app.use('/autentificacao', controllers.autentificacao);
app.use('/permissoes', controllers.permissoes);
app.use('/itens', controllers.itens);
app.use('/vendedores', controllers.vendedores);
app.use('/vendas', controllers.vendas);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  return res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);