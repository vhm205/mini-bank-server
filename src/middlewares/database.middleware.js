const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wrapperSchema = (dbName, dbObj) => {
  dbObj.createdAt = { type: Date, default: Date.now() };
  dbObj.updatedAt = { type: Date, default: Date.now() };
  dbObj.deletedAt = { type: Date, default: null };

	const schema = new Schema(dbObj);
	return mongoose.model(dbName, schema);
};

module.exports = wrapperSchema;
