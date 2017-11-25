/**
 * Project: race-tracker
 * File: index.js
 * @Author: Ping Au-Yeung
 * @Date: 2017-11-14 19:40:18
 * @Last Modified by: Ping Au-Yeung
 * @Last Modified time: 2017-11-24 09:32:07
 */
'use strict'

const srcPath = `${__dirname}/src`
require('app-module-path').addPath(srcPath)
const csvData = require('csv-to-array')
const mongoService = require('services/mongo-service')
const parseJsonService = require('services/parsejson-service')
const async = require('async')
const _ = require('lodash')
const bodyParser = require('body-parser')
var express = require('express'),
app = express(),
port = process.env.PORT || 5050

let path = `${__dirname}/file/ablegrid11-22.csv`
let fields = ['name','dt','date','time','lat','lng','speed','eventid','sequence']
//let data = parseJsonService.parseJson(`${__dirname}/file/test.json`)
// initData((err) => {
  require('./routes')(app);
  //for parsing post param
  app.use(bodyParser.json())
  app.listen(port);
  console.log('race tracker RESTful API server started on: ' + port)
// })

function initData (callback){
  csvData({file: path, columns: fields},(err, result) => {
    // console.log('data', JSON.stringify(result, null, 2))
    insertData(result, (err) => {
      callback(err)
    })
  })
}
function insertData(result, callback) {
  let data = []
  async.waterfall([
  (cb)=> {
    _.forEach (result, (item) => {
      let ts =  new Date(item.dt)
      item.timestamp = ts.getTime()
      item.speed = ((item.speed * 5280)/(60*60)).toFixed(2)
      data.push(item)
    })
    cb(null, data)
  }, (data, cb) => {
    mongoService.insertDocs(data, 'EventResults',  (err) => {
      if (err) {
        console.log('Insert EventResults error', err)
      } else {
        console.log('insert data done')
      }
      cb(err)
    })
  }], (err) => {
    callback(err)
  })
}

