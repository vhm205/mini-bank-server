const bankRoutes = require('./bank.route');
const authRoutes = require('./auth.route');
const customerRoutes = require('./customer.route');

const { authJwt } = require('../middlewares');

const prefix = '/api/v1';

const initRoutes = (app) => {
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/customer`, authJwt, customerRoutes);
  app.use(`${prefix}/bank`, authJwt, bankRoutes);
}

module.exports = initRoutes;
