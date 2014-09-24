var RepresentativeSchema, mongoose, mongooseAutoIncrement;

mongoose = require("mongoose");
mongooseAutoIncrement = require("mongoose-auto-increment");

RepresentativeSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  email: String
  //addresses: [RepresentativeAddressSchema]
},
  {
    collection: 'representative'

  });

RepresentativeSchema.plugin(mongooseAutoIncrement.plugin, {
  // Nome da model
  model: 'Representative',

  // Valor inicial do auto incremento
  startAt: 1,

  // Valor do incremento
  incrementBy: 1
});

module.exports = mongoose.model("Representative",RepresentativeSchema);