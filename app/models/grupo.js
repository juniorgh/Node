var GrupoSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

GrupoSchema = new mongoose.Schema({
  _id: Number,
  nome: String,
  permissoes: [{
    type: Number,
    ref: 'Permissao'
  }],
}, {
  collection: 'grupo'
});

GrupoSchema.plugin(mongooseAutoIncrement.plugin, {
// Nome da model
model: 'Grupo',

// Valor inicial do auto incremento
startAt: 1,

// Valor do incremento
incrementBy: 1
});

module.exports = mongoose.model("Grupo",GrupoSchema);