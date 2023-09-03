const mongoose = require('mongoose');
const {
	DB_RS_1_HOST,
	DB_RS_1_PORT,
	DB_NAME,
	DB_DEBUG,
} = require('./env.config');

/*
 * https://www.mongodb.com/docs/manual/reference/connection-string/#read-preference-options
 */
const initConnectionDb = () => {
	mongoose.set('debug', DB_DEBUG);
	mongoose
		.connect(
			`mongodb://${DB_RS_1_HOST}:${DB_RS_1_PORT}/${DB_NAME}?replicaSet=mongo-rs&directConnection=true&readPreference=secondaryPreferred`,
			// `mongodb://${DB_USER}:${DB_PASS}@${DB_RS_1_HOST}:${DB_RS_1_PORT}/${DB_NAME}?replicaSet=mongo-rs&directConnection=true&readPreference=secondaryPreferred`,
			{
				maxPoolSize: 10,
				family: 4, // Use IPv4, skip trying IPv6
				serverSelectionTimeoutMS: 5000,
			}
		)
		.catch((err) => {
			console.error(err);
		});

	const conn = mongoose.connection;
	conn.on('connected', function () {
		console.log('database is connected successfully');
	});
	conn.on('disconnected', function () {
		console.log('database is disconnected successfully');
	});
	conn.on('error', console.error.bind(console, 'connection error:'));
};

module.exports = { initConnectionDb };
