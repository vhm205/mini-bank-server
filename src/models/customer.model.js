const mongoose = require('mongoose');
const DATABASE_MIDDLEWARE = require('../middlewares/database.middleware');

const customerModel = DATABASE_MIDDLEWARE('Customer', {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

module.exports = customerModel;
