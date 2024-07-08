const { Schema, model, model, default: mongoose } = require("mongoose");

const PaymentsSchema = new Schema({
});

const PaymentModel = model('Payment', PaymentsSchema);

module.exports = PaymentModel;