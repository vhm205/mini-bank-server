const BaseError = require('./base.exception');
const { httpCode } = require('../constants');

class NotFoundException extends BaseError {
  constructor(name, statusCode = httpCode.NOT_FOUND, description = 'Not found', isOperational = true) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = NotFoundException;
