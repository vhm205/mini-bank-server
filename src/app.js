const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
const app = express();

const { initConnectionDb, Env } = require('./configs');
const { logging, formatResponse, catchException } = require('./middlewares');
const initRoutes = require('./routes');

const port = process.env.PORT || 2005;
const whitelist = ['http://localhost:5173'];

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: 'GET,POST,PATCH',
	allowedHeaders: [
		'Origin',
		'X-Requested-With',
		'Content-Type',
		'Accept',
		'Authorization',
	],
};

app.use(timeout('5s'));
app.use(cors(corsOptions));
app.use(express.json());

if (Env.APP_DEBUG) {
	app.use(logging);
}

initConnectionDb();
initRoutes(app);

app.use(catchException);
app.use(formatResponse);

process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', (err) => {
		console.error(
			new Date().toUTCString() + ' uncaughtException:',
			err.message
		);
		console.error(err.stack);
		process.exit(1);
	});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
