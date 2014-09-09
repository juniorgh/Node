var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');

routes.index = function (req, res) {
  var Usuario;

  Usuario = mongoose.model('Usuario');

  Usuario.find().exec(function (err, usuarios) {
    res.render('usuario/index', {
      usuarios: usuarios
    });
  });
};

routes.form = function (req, res, next) {
  res.render('usuario/form');
};

routes.visualizar = function (req, res, next) {

  res.render('usuario/view');
};

routes.salvar = function(req, res, next){
  var dados, Usuario, usuario;

  Usuario = mongoose.model('Usuario');

  dados = req.param('usuario');

  if(dados.id === undefined) {
    usuario = new Usuario(dados);
    usuario.save(function (err) {
      res.json({
        dados: dados,
        usuario: usuario,
        status: err || "sucesso!"
      });
    });
  } else {
    Usuario.findByIdAndUpdate(parseInt(dados.id, 10), dados, function (err) {
      res.json({
        dados: dados,
        usuario: usuario,
        status: err || "sucesso!"
      });
    });
  }
}

router.get('/', routes.index);
router.get('/novo', routes.form);
router.post('/salvar',routes.salvar);
router.get('/[0-9]*/editar', routes.form);
router.get('/[0-9]*/excluir', routes.excluir);
router.get('/[0-9]*', routes.visualizar);

module.exports = router;

