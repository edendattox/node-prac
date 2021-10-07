const winston = require("winston");
module.exports = function (err, req, res, next) {
  // log the exception
  winston.error(err.message, err);

  res.status(500).send("Something failed.");
};

/**
 *   lvl of winston loggers
 *
 * first error
 *
 * second warn
 *
 * third info
 *
 * fourth verbose
 *
 * fifth debug
 *
 * sixth silly
 *
 */
