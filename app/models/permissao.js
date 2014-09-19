var PermissaoSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

PermissaoSchema = new mongoose.Schema({
  _id: Number,
  nome: String
}, {
  collection: 'permissao'
});

PermissaoSchema.plugin(mongooseAutoIncrement.plugin, {
// Nome da model
model: 'Permissao',

// Valor inicial do auto incremento
startAt: 1,

// Valor do incremento
incrementBy: 1
});

module.exports = mongoose.model("Permissao",PermissaoSchema);