var cafes = require('../../app/controllers/cafes.server.controller.js');

module.exports = function(app) {
  app.route('/api/cafes')
    .get(cafes.list);
}
