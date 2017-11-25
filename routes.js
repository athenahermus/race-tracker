module.exports = function(app){
  var trackers = require('./src/controllers/trackers');
  app.get('/trackers', trackers.findAll);
  app.get('/trackers/:eventid/sequence/:sequence', trackers.findByEventId);
  app.post('/trackers', trackers.add);
  app.put('/trackers/:userid', trackers.update);
  app.delete('/trackers/:id', trackers.delete);
}
