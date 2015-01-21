var cafes = require('../../app/controllers/cafes.server.controller.js');

module.exports = function(app) {
  app.route('/api/cafes')
    .get(cafes.list)
    .post(cafes.create);

  app.route('/api/cafes/:cafeId')
    .get(cafes.read)
    .put(cafes.update)
    .delete(cafes.delete);

  app.param('cafeId', cafes.cafeById)
};
