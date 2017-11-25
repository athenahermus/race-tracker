/**
 * Project: race-tracker
 * File: src/services/parsejson-service.js
 * @Author: Ping Au-Yeung
 * @Date: 2017-11-15 16:27:51
 * @Last Modified by: Ping Au-Yeung
 * @Last Modified time: 2017-11-15 17:06:03
 */
'use strict'
const fs = require('fs')
const path = '../file/'
const log = require('../services/logger')('raceTracker:service:parsejson-service')
const jsonReader = require("json-read-and-parse-file")
class ParseJsonService {
  parseJson (file) {
    var data = jsonReader(file)
    console.log('data', JSON.stringify(data, null, 2))
    return data
  }
}
module.exports = new ParseJsonService()
