const { httpCode } = require('../common/constants');

const formatResponse = (payload, _, res, next) => {
	const { statusCode = httpCode.OK, data, message } = payload;
	const isErrorInstance = payload instanceof Error;

	if (!isErrorInstance) {
		res.status(statusCode).json({
			data,
			metadata: {
				error: false,
				message,
			},
		});
	}

	next(payload);
};

module.exports = formatResponse;
