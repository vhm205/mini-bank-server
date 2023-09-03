const BaseError = require('./base.exception');
const { httpCode } = require('../constants');

class BadRequestException extends BaseError {
  constructor(message, statusCode = httpCode.BAD_REQUEST, description = 'Bad request', isOperational = true) {
    super(message, statusCode, isOperational, description);
  }
}

module.exports = BadRequestException;
