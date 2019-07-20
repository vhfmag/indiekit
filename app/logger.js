const {createLogger, format, transports} = require('winston');
const {Timber} = require('@timberio/node');
const {TimberTransport} = require('@timberio/winston');

const config = require(process.env.PWD + '/app/config');

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
    })
  ]
});

// Log to Timber if API key provided
if (config.timber.token) {
  const timber = new Timber(config.timber.token, config.timber.source);
  logger.add(new TimberTransport(timber));
}

// Log to console with colorized simple format if we’re not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

module.exports = logger;
