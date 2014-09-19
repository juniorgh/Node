var UsuarioSchema, mongoose, mongooseAutoIncrement;


bcrypt = require('bcrypt-nodejs');
mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

UsuarioSchema = new mongoose.Schema({
  _id: Number,
  nome: String,
  idade: String,
  email: String,
  senha: String,
  foto: String,
  cidade: String,
  descricao: String,
  data: Date,
  site: String,
  grupo: {
    type: Number,
    ref: 'Grupo'
  },
}, {
  collection: 'usuario'
});

UsuarioSchema.plugin(mongooseAutoIncrement.plugin, {
  // Nome da model
  model: 'Usuario',

  // Valor inicial do auto incremento
  startAt: 1,

  // Valor do incremento
  incrementBy: 1
});

UsuarioSchema.methods.generateHash = function (senha) {
  return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};

// Verifica se uma senha é válida
UsuarioSchema.methods.validPassword = function (senha) {
  return bcrypt.compareSync(senha, this.senha);
};

module.exports = mongoose.model("Usuario",UsuarioSchema);