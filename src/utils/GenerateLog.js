const pino = require("pino");
const pinoElastic = require("pino-elasticsearch");
const streamToElastic = pinoElastic({
  index: "one-module-testing",
  consistency: "one",
  node: process.env.elasticsearch,
  "es-version": 7,
  "flush-bytes": 1000,
});

module.exports = {
  async Info(data) {
    const logger = pino({ level: "info" }, streamToElastic);
    logger.info(data);
  },
  async Error(error) {
    const logger = pino({ level: "error" }, streamToElastic);
    logger.error(error);
  },
};
