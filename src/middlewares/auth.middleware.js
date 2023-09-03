const { verifyJwt } = require('../helpers/jwt');

const authJwt = (req, res, next) => {
	const authHeader =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.headers['authorization'];

  if(!authHeader) {
    return res.status(403).json({
      data: null,
      metadata: {
        error: true,
        message: 'You must be logged in',
      },
    })
  }

  const [type, token] = authHeader.split(' ');

	if (!token || type !== 'Bearer') {
		return res.status(403).json({
			data: null,
			metadata: {
				error: true,
				message: 'no token provided',
			},
		});
	}

	const decoded = verifyJwt(token);
	req.user = decoded;

	next();
};

module.exports = authJwt;
