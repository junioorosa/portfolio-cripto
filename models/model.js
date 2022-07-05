const mongoose = require('mongoose');

const historicSchema = new mongoose.Schema({
    criptoName: {type: String, required: true},
    investment: {type: Number, required: true},
    paidPerUnit: {type: Number, required: true},
    amount: {type: Number, required: true},
    dolarReal: {type: Number, required: true},
    date: { type: Date, default: Date.now},
});

const metricSchema = new mongoose.Schema({
    criptoName: {type: String, required: true},
    investment: {type: Number, required: true},
    amount: {type: Number, required: true},
    averagePricePurchase: {type: Number, required: true},
    averagePriceUSDBRL: {type: Number, required: true},
});

const Historic = mongoose.model('Historic', historicSchema);
const Metric = mongoose.model('Metric', metricSchema);

module.exports = {Historic, Metric}