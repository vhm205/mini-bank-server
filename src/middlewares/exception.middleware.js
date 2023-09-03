const { httpCode } = require('../common/constants');

const catchException = (error, _, res, next) => {
	const { statusCode = httpCode.INTERNAL_SERVER, message } = error;
  const isErrorInstance = error instanceof Error;

  if(isErrorInstance) {
    res.status(statusCode).json({
      data: null,
      metadata: {
        error: true,
        message,
      },
    });
  }

	next(error);
};

module.exports = catchException;
