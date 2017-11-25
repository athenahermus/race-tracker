/*
 * @Author: Ping Au-Yeung
 * @Date: 2017-11-15 16:15:04
 * @Last Modified by:   Ping Au-Yeung
 * @Last Modified time: 2017-11-15 16:15:04
 */
'use strict'

const bunyan = require('bunyan')
const bformat = require('bunyan-format')

class Logger {
  /**
   * getLogger
   *
   * A factory method to building a new logger for a specific type
   *
   * @param {string} namespace
   */
  static getLogger (namespace) {
    if (!namespace) {
      namespace = 'peachjar'
    }

    let logger = new Logger()

    let formatOut = bformat({
      outputMode: process.env.LOG_FORMAT,
      levelInString: true
    })

    logger.namespace = namespace
    logger.pattern = process.env.LOG_PATTERN || '*'

    logger.log = bunyan.createLogger({
      name: namespace,
      stream: formatOut,
      level: process.env.LOG_LEVEL
    })

    return logger
  }
  /**
   * matchNamespace
   *
   * match the namespace to the configured allowed pattern
   */
  matchNamespace () {
    let rule = this.pattern
    let result = new RegExp('^' + rule.split('*').join('.*') + '$').test(this.namespace)
    return result
  }

  /**
   * fatal
   *
   * hand entire call over to logger
   */
  fatal () {
    if (this.matchNamespace()) {
      this.log.fatal.apply(this.log, arguments)
    }
  }

  /**
   * error
   *
   * hand entire call over to logger
   */
  error () {
    if (this.matchNamespace()) {
      this.log.error.apply(this.log, arguments)
    }
  }

  /**
   * warn
   *
   * hand entire call over to logger
   */
  warn () {
    if (this.matchNamespace()) {
      this.log.warn.apply(this.log, arguments)
    }
  }

  /**
   * info
   *
   * hand entire call over to logger
   */
  info () {
    if (this.matchNamespace()) {
      this.log.info.apply(this.log, arguments)
    }
  }

  /**
   * debug
   *
   * hand entire call over to logger
   */
  debug () {
    if (this.matchNamespace()) {
      this.log.debug.apply(this.log, arguments)
    }
  }

  /**
   * trace
   *
   * hand entire call over to logger
   */
  trace () {
    if (this.matchNamespace()) {
      this.log.trace.apply(this.log, arguments)
    }
  }
}

let LoggerFactory = Logger.getLogger
LoggerFactory.configuration = new Logger()
module.exports = LoggerFactory
