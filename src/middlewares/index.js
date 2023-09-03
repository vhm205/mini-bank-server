const authJwt = require('./auth.middleware');
const logging = require('./logging.middleware');
const catchException = require('./exception.middleware');
const formatResponse = require('./pipe.middleware');

module.exports = {
	logging,
	catchException,
	formatResponse,
  authJwt,
};
