const CUSTOMER_MODEL = require('../models/customer.model');
const { verify } = require('../helpers/hash');
const { generateJwt } = require('../helpers/jwt');

const authController = {
	login: async (req, res) => {
		try {
			const body = req.body;
			const { username, password } = body;

			const customer = await CUSTOMER_MODEL.findOne({ username })
				.select('_id username +password')
				.lean();

			if (!customer) {
				return res.status(400).json({
					data: null,
					metadata: {
						error: true,
						message: 'customer not found',
					},
				});
			}

			const isValid = await verify(password, customer.password);
			if (!isValid) {
				return res.status(400).json({
					data: null,
					metadata: {
						error: true,
						message: 'invalid password',
					},
				});
			}

			const token = generateJwt({
				id: customer._id,
				username: customer.username,
			});

			res.status(200).json({
				data: token,
				metadata: {
					error: false,
					message: 'login success',
				},
			});
		} catch (error) {
			res.status(500).json({
				data: null,
				metadata: {
					error: true,
					message: error.message,
				},
			});
		}
	},
};

module.exports = authController;
