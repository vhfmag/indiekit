/* eslint new-cap: ["error", { "newIsCap": false }] */
const {createLogger, format, transports} = require('winston');

const logger = new createLogger({
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
