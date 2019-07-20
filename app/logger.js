const {createLogger, format, transports} = require('winston');
const {Timber} = require('@timberio/node');
const {TimberTransport} = require('@timberio/winston');

const config = require(process.env.PWD + '/app/config');

// Configure Timber
const timber = new Timber(config.timber.token, config.timber.source);

const logger = new createLogger({ // eslint-disable-line new-cap
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({
      stack: true
    }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: process.env.PWD + '/app/logs/error.log',
      level: 'error'
    }),
    new transports.File({
      filename: process.env.PWD + '/app/logs/combined.log'
    }),
    new TimberTransport(timber)
  ]
});

// If we’re not in production log to the `console` with colorized simple format
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

module.exports = logger;
