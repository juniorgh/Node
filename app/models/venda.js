var VendaSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

VendaSchema = new mongoose.Schema({
  
  _id: Number,
  
  vendedor: {
    type: Number,
    ref: 'vendedor'
  },

  usuario: {
    type: Number,
    ref: 'usuario'
  },
  item: {
    type: Number,
    ref: 'item'
  },

  dataVenda: Date

}, {
  collection: 'venda'
});

VendaSchema.plugin(mongooseAutoIncrement.plugin, {
// Nome da model
model: 'Venda',

// Valor inicial do auto incremento
startAt: 1,

// Valor do incremento
incrementBy: 1
});

module.exports = mongoose.model("Venda",VendaSchema);