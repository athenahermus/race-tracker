/**
 * Project: race-tracker
 * File: src/services/mongo-service.js
 * @Author: Ping Au-Yeung
 * @Date: 2017-11-14 20:24:17
 * @Last Modified by: Ping Au-Yeung
 * @Last Modified time: 2017-11-24 09:40:24
 */
'use strict'
/* onst config = require('config')
connect with auth
var MongoClient = require('mongodb').MongoClient,
f = require('util').format,
assert = require('assert')
var user = encodeURIComponent(config.get('mongo.user'))
var password = encodeURIComponent(config.get('mongo.password'))
var authMechanism = 'DEFAULT'
// Connection URL
var url = f('mongodb://%s:%s@localhost:27017/myproject?authMechanism=%s',
user, password, authMechanism)
*/
const log = require('../services/logger')('raceTracker:service:mongo-service')
const url = 'mongodb://localhost:27017/raceTracker'
const MongoClient = require('mongodb').MongoClient
const _ = require('lodash')


class MongoService {
  insertDocs (docs, table, cb) {
    MongoClient.connect(url, (err, db) => {
      if (err) { return cb(err) }
      // let collection = db.collection(table)
      db.collection(table).insert(docs, {w:1}, (err, result) => {
        if (err) {
          log.error('get collection error', table, err)
        }
        return cb(err)
      })
    })
  }

  findDocs (param, table, cb) {
    console.log('param', param, 'table', table)
    MongoClient.connect(url, (err, db) => {
      db.collection(table).find(param,{'_id':0,'name':1,'lat':1,'lng':1,'speed':1}).toArray((err, results) => {
        if (err) console.log(err)
        cb(err, results)
      })
    })
  }
  updateDocs (param, table, cb) {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        log.error('mongo connection error on updateDocs', table, err)
        return cb(err)
      }
      db.collection(table, (err, collection) => {
        if (err) {
          log.error('updateDocs collection error', table, err)
          return cb(err)
        }
        collection.update(param, (err, result) => {
          if (err) {
            log.error('mongo update ops error', table, err)
            return cb(err)
          }
          console.log('Document Updated Successfully')
          cb(err)
        })
      })
    })
  }

  delDocs (param, table, cb) {
    MongoClient.connect(url, (err, db) => {
      if (err) {
        log.error('mongo connection error on delDocs', table, err)
        return cb(err)
      }
      db.collection(table, (err, collection) => {
        if (err) {
          log.error('delDocs collection error', table, err)
          return cb(err)
        }
        collection.remove(param, (err, result) => {
          if (err) {
            log.error('mongo remove op error', table, err)
            return cb(err)
          }
          console.log('Document Removed Successfully')
          cb(err)
        })
      })
    })
  }
}
module.exports = new MongoService()

