var _, router, routes = {}, mongoose, mime, fs, path, moment;

_ = require('underscore');
fs = require('fs');
mime = require('mime');
path = require('path');
moment = require('moment');

router = require('express').Router();
mongoose = require('mongoose');

routes.index = function (req, res) {
  var Usuario;

  Usuario = mongoose.model('Usuario');

     Usuario.find().populate('grupo')
    .exec(function (err, usuarios) {
      res.render('usuario/index', {
        usuarios: usuarios,
        msg: req.flash('sucesso') || []
      });
    });
};

routes.visualizar = function (req, res, next) {
  var Usuario;
  Usuario = mongoose.model('Usuario');
  
  Usuario.findById(parseInt(req.params.id, 10))
    .populate('grupo')
    .exec(function(err, usuario) {
      
      res.render('usuario/view',{
        usuario:usuario,
        moment:moment
      });
  });
};

routes.form = function (req, res, next) {
  var Usuario, Grupo;

  Usuario = mongoose.model('Usuario');
  Grupo = mongoose.model('Grupo');

  Grupo.find()
    .exec(function (err, grupos) {
     Usuario.findById(parseInt(req.params.id, 10))
    .exec(function(err, usuario){
        res.render('usuario/form', {
          usuario: usuario || {},
          grupos: grupos || {},
          moment: moment
        });
      });
    });
};

routes.salvar = function(req, res, next){
  var dados, Usuario, usuario;

  Usuario = mongoose.model('Usuario');

  dados = req.param('usuario');

  fotos = req.files.usuario;

  //return res.send('');

  fs.readFile(req.files.usuario.path,function(err,data){
    var ext = mime.extension(mime.lookup(req.files.usuario.path));
    var foto = dados.email + '.' + ext;
    var npath = path.resolve(path.normalize(__dirname + '/../../public/upload/' + foto));

    fs.writeFile(npath,data,function(err){
      dados.foto = foto;
      usuario = new Usuario;

      if (!_.isEmpty(dados.senha)) {
        dados.senha = usuario.generateHash(dados.senha);
      }

      if(dados.id === undefined) {
        _.extend(usuario, dados);
        usuario.save(function (err) {
          
          res.redirect('/usuarios');
        });
      } else {
        Usuario.findByIdAndUpdate(parseInt(dados.id, 10), dados, function (err) {
          res.redirect('/usuarios');
        });
      }   
    });
  });
}

routes.excluir = function (req, res, next) {
  var id, Usuario;

  id = parseInt(req.params.id, 10);
  
  Usuario = mongoose.model('Usuario');

  
  Usuario.findByIdAndRemove(id, function (err) {
    res.redirect('/usuarios');
  });
};

router.get('/', routes.index);
router.get('/novo', routes.form);
router.post('/salvar',routes.salvar);
router.get('/:id([0-9]*)/editar', routes.form);
router.get('/:id([0-9]*)/excluir', routes.excluir);
router.get('/:id([0-9]*)', routes.visualizar);
  
module.exports = router;

