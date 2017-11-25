'use strict'
const mongoService = require('services/mongo-service')

exports.findAll = (req, res) => {
  res.send([{
    'name': 'Ed Hoffman',
    'lat': '2.33',
    'lng': '13.45',
    'speed': '5'
  }])
}
exports.findByEventId = (req, res) => {
  let table = 'EventResults'
  mongoService.findDocs (req.params, table, (err, result) => {
    if (err) console.log(err)
    res.send(result)
  })
}

exports.add = function() {}
exports.update = function() {}
exports.delete = function() {}
