var ItemSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

VariacaoSchema = new mongoose.Schema({
  id:  Number,
  descricao: String,
  valor: Number
});

VariacaoSchema.plugin(mongooseAutoIncrement.plugin, {
  model: 'Item_Variacao',
  startAt: 1, 
  incrementBy: 1
});

ItemSchema = new mongoose.Schema({
  _id: Number,
  nome: String,
  qtd: String,
  preco: String,
  descricao: String,
  variacao: [VariacaoSchema],    
}, {
  collection: 'item'
});

ItemSchema.plugin(mongooseAutoIncrement.plugin, {
// Nome da model
model: 'Item',

// Valor inicial do auto incremento
startAt: 1,

// Valor do incremento
incrementBy: 1
});

module.exports = mongoose.model("Item",ItemSchema);