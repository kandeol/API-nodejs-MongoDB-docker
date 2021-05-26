const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

var optionSchema = new mongoose.Schema({
    numero_option: Number,
    identifiant: String,
    description: String,
});

optionSchema.plugin(AutoIncrement, { inc_field: 'numero_option' });


const Option = mongoose.model(
    "Option", optionSchema
);
module.exports = Option;