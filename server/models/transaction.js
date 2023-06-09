const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
	amount: Number,
	type: String,
	category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

exports.Transaction = mongoose.model('Transaction', transactionSchema);
