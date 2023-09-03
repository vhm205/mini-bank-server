class BaseError extends Error {
  constructor(message, statusCode, isOperational, description) {
    super(message);
    this.name = description;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = BaseError;
