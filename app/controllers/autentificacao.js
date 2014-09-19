var router, routes = {}, mongoose;

router = require('express').Router();
mongoose = require('mongoose');
module.exports = function(passport){

    routes.index = function(req, res){
        res.render('autentificacao/index', {
            msg: req.flash('erro') || []
        });
    };

    routes.autenticar = function(req, res, next){

        var Usuario, email, senha;

        Usuario = mongoose.model('Usuario');
        login = req.param('login') || null;
        senha = req.param('senha') || null;
        connect = null;

        Usuario.findOne({email:login, senha:senha})
        .exec(function(err,usuario){
            if(usuario === null) {
                req.flash('erro', 'dados invalidos');
                res.redirect('/autentificacao');

            } else {
                req.flash('sucesso', 'bem vindo!!');
                res.redirect('/usuarios');
            }
        });
    };

    routes.login = passport.authenticate('local-signup', {
        successRedirect : '/usuarios',
        failureRedirect : '/autentificacao',
        failureFlash : true
    });

    router.get('/', routes.index);
    router.post('/login', routes.login);

    return router;

}
