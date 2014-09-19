var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');

routes.index = function (req, res) {
  var Grupo;

  Grupo = mongoose.model('Grupo');

  Grupo.find().exec(function (err,grupos) {
    res.render('grupo/index', {
      grupos: grupos
    });
  });
};

routes.integrantes = function (req, res, next) {
  var Usuario, Grupo, id;

  Grupo = mongoose.model('Grupo');
  Usuario = mongoose.model('Usuario');
  id = parseInt(req.params.id, 10);

  Grupo.findById(id)
  .exec(function (err,grupo) {
    Usuario.find({ grupo: id })
    .populate('grupo')
    .exec(function (err,usuarios) {

      console.log(usuarios); 

      res.render('grupo/integrantes', {
        usuarios: usuarios || {},
        grupo: grupo || {}
      });
    });
  });
};

routes.visualizar = function (req, res, next) {
  var Grupo;
  Grupo = mongoose.model('Grupo');

  Grupo.findById(parseInt(req.params.id, 10))
  .exec(function (err, grupo) {
    res.render('grupo/view', {
      grupo: grupo
    });
  });
};

routes.salvar = function (req, res, next) {
  var dados, Grupo, grupo;

  Grupo = mongoose.model('Grupo');

  dados = req.param('grupo');

  if (dados.id === undefined) {
    grupo = new Grupo(dados);
    grupo.save(function (err) {
      res.redirect('/grupos');
    });
  } else {
    Grupo.findByIdAndUpdate(parseInt(dados.id, 10), dados, function (err) {
      res.redirect('/grupos');
    });
  }
};

routes.form = function (req, res) {
  var Grupo;
  Grupo = mongoose.model('Grupo');

  Grupo.findById(parseInt(req.params.id, 10)).exec(function (err, grupo) {
    res.render('grupo/form', {
      grupo: grupo || {}
    });
  });
};

routes.excluir = function (req, res) {
  var id, Grupo;

  id = parseInt(req.params.id, 10);

  Grupo = mongoose.model('Grupo');


  Grupo.findByIdAndRemove(id, function (err) {
    res.redirect('/grupos');
  });
};

router.get('/', routes.index);
router.get('/novo', routes.form);
router.post('/salvar', routes.salvar);
router.get('/:id([0-9]*)/integrantes', routes.integrantes);
router.get('/:id([0-9]*)/editar', routes.form);
router.get('/:id([0-9]*)/excluir', routes.excluir);
router.get('/:id([0-9]*)', routes.visualizar);

module.exports = router;