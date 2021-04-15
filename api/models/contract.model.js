const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

var contractSchema = new mongoose.Schema({
    numero_contract: Number,
    status: String,
    start_date: {
        type: Date,
        min: Date.now(),
    },
    end_date: Date,
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Option"
        }
    ],
    client: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

contractSchema.plugin(AutoIncrement, { inc_field: 'numero_contract' });

const Contract = mongoose.model(
    "Contract", contractSchema
);
module.exports = Contract;