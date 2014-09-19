var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');

routes.index = function(req, res, next){
    res.render('permissao','index');
};

router.get('/', routes.index);

module.exports = router;