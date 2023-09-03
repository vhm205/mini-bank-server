const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DATABASE_MIDDLEWARE = require('../middlewares/database.middleware');

const cardModel = DATABASE_MIDDLEWARE('Card', {
  cardName: { type: String, required: true, unique: true },
	cardNumber: { type: String, required: true, unique: true },
	cardCVC: String,
  alias: { type: String },
  balance: { type: Schema.Types.Decimal128, default: 0, min: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  bankId: { type: Schema.Types.ObjectId, ref: 'bank', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'customer', required: true },
});

module.exports = cardModel;
