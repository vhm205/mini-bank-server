const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DATABASE_MIDDLEWARE = require('../middlewares/database.middleware');

const transactionModel = DATABASE_MIDDLEWARE('Transaction', {
  code: { type: String, unique: true },
	title: { type: String },
  description: { type: String },
  amount: { type: Schema.Types.Decimal128 },
  from: { type: Schema.Types.ObjectId, ref: 'card' },
  to: { type: Schema.Types.ObjectId, ref: 'card' },
	type: { type: String, enum: ['transfer', 'pay'], default: 'transfer' },
});

module.exports = transactionModel;
