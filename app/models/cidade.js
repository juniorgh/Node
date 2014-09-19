var CidadeSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

CidadeSchema = new mongoose.Schema({
  _id: Number,
  nome: String
},
  {
    collection: 'cidade'

  });

CidadeSchema.plugin(mongooseAutoIncrement.plugin, {
  // Nome da model
  model: 'Cidade',

  // Valor inicial do auto incremento
  startAt: 1,

  // Valor do incremento
  incrementBy: 1
});

module.exports = mongoose.model("Cidade",CidadeSchema);