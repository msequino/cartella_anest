var winston = require("winston");

var log = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info',
      filename: 'apps/cartella_anest/server/tmp/info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error',
      filename: 'apps/cartella_anest/server/tmp/error.log',
      level: 'error'
    }),
    new (winston.transports.File)({
      name: 'debug',
      filename: 'apps/cartella_anest/server/tmp/debug.log',
      level: 'debug'
    })

  ]
});

module.exports = log;
