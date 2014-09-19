var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');


routes.index = function(req, res){
  var Item;

  Item = mongoose.model('Item');

  Item.find().exec(function (err, itens){
    res.render('item/index',{
      itens:itens
    }); 

  });
};

routes.form = function(req, res){
  res.render('item/form');
};

routes.salvar = function (req, res, next) {
  var dados, Item, item;

  Item = mongoose.model('Item');

  dados = req.param('item');

  item = new Item(dados);
  item.save(function (err) {
  
  res.redirect('/itens');
    
  });
};

routes.variar = function (req, res, next){
  var dados, Item;
  Item = mongoose.model('Item');
  id = parseInt(req.params.id, 10);

  Item.findById(id)
  .exec(function (err, itens) {
    res.render('item/variacao',{
      itens:itens
    });
  });
};


routes.incluirVariacao = function(req, res, next){
  var Item, id;

  id = parseInt(req.param('_id'), 10);
  variacao = req.param('variacao');

  Item = mongoose.model('Item');

  Item.findById(id, function (err, item) {
    item.variacao.push(variacao);
    item.save(function (err, item) {

      res.redirect('/itens');
    });
  });
};
routes.view = function(req, res, next){

  var id, item, Item, _; 
  
  Item = mongoose.model('Item');
  id = parseInt(req.params.id ,10);

  Item.findById(id,function (err, itens){
      res.render('item/view',{
        itens: itens
      });   
  });

};

routes.excluir = function(req, res, next){
  var Item, id;

  Item = mongoose.model('Item');
  id = parseInt(req.params.id, 10);

  Item.findByIdAndRemove(id, function (err) {
    console.log(err);
    res.redirect('/itens');
  });
}

router.get('/novo', routes.form);
router.post('/varitem', routes.incluirVariacao);
router.post('/salvar', routes.salvar);
router.get('/', routes.index);
router.get('/:id([0-9]*)/excluir', routes.excluir);
router.get('/:id([0-9]*)/variar', routes.variar);
router.get('/:id([0-9]*)/view', routes.view);

module.exports = router;