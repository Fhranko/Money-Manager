const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	amount: Number,
	type: String,
});

exports.Transaction = mongoose.model('Transaction', transactionSchema);
