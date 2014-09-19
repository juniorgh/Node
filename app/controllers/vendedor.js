var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');

routes.index = function(req, res){
  var Vendedor;

  Vendedor = mongoose.model('Vendedor');

  Vendedor.find().exec(function (err, vendedores){
    res.render('vendedor/index',{
      vendedores: vendedores
    });
  });

  
};

routes.salvar = function(req, res, next){
    var Vendedor, dados, vendedor;

    Vendedor = mongoose.model('Vendedor');
    dados = req.param('vendedor');
    
    console.log(dados);

    vendedor = new Vendedor(dados);

    vendedor.save(function (err){
        res.redirect('/vendedores');
    });
};

routes.form = function(req, res, next){

  res.render('vendedor/form');
}

router.get('/novo', routes.form);
router.post('/salvar' , routes.salvar);
router.get('/', routes.index);

module.exports = router;