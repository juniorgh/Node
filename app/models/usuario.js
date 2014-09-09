var UsuarioSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

UsuarioSchema = new mongoose.Schema({
  _id: Number,
  email: String,
  senha: String
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

module.exports = mongoose.model("Usuario",UsuarioSchema);