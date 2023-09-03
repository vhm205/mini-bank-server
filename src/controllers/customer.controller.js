const CUSTOMER_MODEL = require('../models/customer.model');
const { httpCode } = require('../common/constants');
const { hash } = require('../helpers/hash');
const { Api400Error } = require('../common/exceptions');

const customerController = {
	create: async (req, _, next) => {
		try {
			const body = req.body;

			const passwordHashed = await hash(body.password);
			const input = {
				username: body.username,
				password: passwordHashed,
			};

			const newCustomer = await CUSTOMER_MODEL.create(input);
			if (!newCustomer) {
				return new Api400Error('failed to create customer');
			}

			next({
				statusCode: httpCode.CREATED,
				message: 'create customer success',
			});
		} catch (error) {
			next(error);
		}
	},
	getInfo: async (req, _, next) => {
		const { id, username } = req.user;
		next({
			data: { id, username },
			statusCode: httpCode.OK,
			message: 'get info success',
		});
	},
};

module.exports = customerController;
