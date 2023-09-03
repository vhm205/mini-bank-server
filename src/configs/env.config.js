exports.NODE_ENV = process.env.NODE_ENV || 'development';

exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

exports.DB_RS_1_HOST = process.env.DB_RS_1_HOST || 'localhost';
exports.DB_RS_1_PORT = process.env.DB_RS_1_PORT || 30001;
exports.DB_RS_2_PORT = process.env.DB_RS_2_PORT || 30002;
exports.DB_RS_3_PORT = process.env.DB_RS_3_PORT || 30003;

exports.DB_USER = process.env.DB_USER || '';
exports.DB_PASS = process.env.DB_PASS || '';
exports.DB_NAME = process.env.DB_NAME || 'mini_bank';

exports.DB_DEBUG = process.env.DB_DEBUG === 'true';
exports.APP_DEBUG = process.env.APP_DEBUG === 'true';
