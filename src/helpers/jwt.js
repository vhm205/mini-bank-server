const jwt = require('jsonwebtoken');
const { Env } = require('../configs');

function generateJwt(payload) {
	const token = jwt.sign(payload, Env.JWT_SECRET, {
		expiresIn: Env.JWT_EXPIRES_IN,
	});
	return token;
}

function verifyJwt(token) {
  const decoded = jwt.verify(token, Env.JWT_SECRET);
  return decoded;
}

module.exports = {
	generateJwt,
	verifyJwt,
};
