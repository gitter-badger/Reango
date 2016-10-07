import winston from 'winston';

export default function errorHandler(err, res) {
  new winston.Logger(
    {
      exitOnError: false,
      transports: [
        new winston.transports.Console(
          {
            handleExceptions: true,
            humanReadableUnhandledException: true
          }
        )]
    }
  ).error(err);

  if (res.headersSent) {
    res.end();
  } else {
    res.send(500, 'Internal server error.');
  }
}
