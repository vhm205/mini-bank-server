const mongoose = require('mongoose');
const { fakerVI: faker } = require('@faker-js/faker');

const BANK_MODEL = require('../models/bank.model');
const CUSTOMER_MODEL = require('../models/customer.model');
const CARD_MODEL = require('../models/card.model');
const TRANSACTION_MODEL = require('../models/transaction.model');

const { Api404Error, Api400Error } = require('../common/exceptions');
const { httpCode } = require('../common/constants');

const bankController = {
	create: async (req, _, next) => {
		try {
			const body = req.body;

			const newBank = await BANK_MODEL.create(body);
			if (!newBank) {
				throw new Api400Error('failed to create bank');
			}

			next({ statusCode: httpCode.OK, message: 'create bank success' });
		} catch (error) {
			next(error);
		}
	},
	createCard: async (req, _, next) => {
		try {
			const { bankName, customerName, cardName } = req.body;

			const [bank, customer] = await Promise.all([
				BANK_MODEL.findOne({ name: bankName }),
				CUSTOMER_MODEL.findOne({ username: customerName }),
			]);

			if (!bank) {
				throw new Api404Error('bank not found');
			}

			if (!customer) {
				throw new Api404Error('customer not found');
			}

			const checkExists = await CARD_MODEL.findOne({
				bankId: bank._id,
				customerId: customer._id,
			});
			if (checkExists) {
				throw new Api400Error('card already exists');
			}

			const card = await CARD_MODEL.create([
				{
					cardName,
					cardNumber: faker.finance.creditCardNumber(),
					cardCVC: faker.finance.creditCardCVV(),
					bankId: bank._id,
					customerId: customer._id,
				},
			]);

			next({
				statusCode: httpCode.OK,
				message: 'create card success',
				data: card,
			});
		} catch (error) {
			next(error);
		}
	},
	transfer: async (req, _, next) => {
		const session = await mongoose.startSession();
		try {
			const { from, to, amount } = req.body;

			await session.withTransaction(async () => {
				const [fromCard, toCard] = await Promise.all([
					CARD_MODEL.findOne({
						$or: [{ cardNumber: from }, { alias: from }],
					})
						.select('_id balance')
						.session(session),
					CARD_MODEL.findOne({
						$or: [{ cardNumber: to }, { alias: to }],
					})
						.select('_id balance')
						.session(session),
				]);

				if (!fromCard || !toCard) {
					throw new Api404Error('card not found');
				}

				if (fromCard.balance < +amount) {
					throw new Api400Error('insufficient balance');
				}

				const subtractMoneyResult = await CARD_MODEL.updateOne(
					{ _id: fromCard._id },
					{ $inc: { balance: -amount } },
					{ session }
				);
				if (subtractMoneyResult.modifiedCount === 0) {
					throw new Api400Error('failed to subtract money');
				}

				const addMoneyResult = await CARD_MODEL.updateOne(
					{ _id: toCard._id },
					{ $inc: { balance: amount } },
					{ session }
				);
				if (addMoneyResult.modifiedCount === 0) {
					throw new Api400Error('failed to add money');
				}
			});

			next({ statusCode: 200, message: 'success' });
		} catch (error) {
			next(error);
			await session.abortTransaction();
		}
	},
};

module.exports = bankController;
