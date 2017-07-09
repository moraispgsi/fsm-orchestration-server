import logger from './logger.js';

module.exports = {
  database: 'orchestrationDB',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'orchestrationDB.sqlite',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'Nta$K-AP1',
  jwtSession: { session: false },
};
