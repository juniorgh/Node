var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');

routes.index = function(req, res){
        res.render('venda/index');
};

router.get('/', routes.index);

module.exports = router;