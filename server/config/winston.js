var winston = require("winston");

var log = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info',
      filename: 'server/tmp/info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error',
      filename: 'server/tmp/error.log',
      level: 'error'
    }),
    new (winston.transports.File)({
      name: 'debug',
      filename: 'server/tmp/debug.log',
      level: 'debug'
    })

  ]
});

module.exports = log;
