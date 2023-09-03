const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DATABASE_MIDDLEWARE = require('../middlewares/database.middleware');

const bankModel = DATABASE_MIDDLEWARE('Bank', {
  name: { type: String, required: true, unique: true },
  volume: { type: Schema.Types.Decimal128, required: true },
})

module.exports = bankModel;
