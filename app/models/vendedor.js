var VendedorSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

VendedorSchema = new mongoose.Schema({
  _id: Number,
  nome: String,
  email: String
}, {
  collection: 'vendedor'
});

VendedorSchema.plugin(mongooseAutoIncrement.plugin, {
// Nome da model
model: 'Vendedor',

// Valor inicial do auto incremento
startAt: 1,

// Valor do incremento
incrementBy: 1
});

module.exports = mongoose.model("Vendedor",VendedorSchema);