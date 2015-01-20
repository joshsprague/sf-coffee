var mongoose = require('mongoose'),
  Cafe = mongoose.model('Cafe');

exports.cafeById = function(req, res, next, id) {
  Cafe.findOne({
    _id: id
  }, function(err, cafe) {
    if (err) {
      return next(err);
    } else {
      req.cafe = cafe;
      next();
    }
  });
};

exports.create = function(req, res, next) {
  var cafe = new Cafe(req.body);

  cafe.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(cafe);
    }
  });
};

exports.list = function(req, res, next) {
  Cafe.find({}, function(err, cafes) {
    if (err) {
      return next(err);
    } else {
      res.json(cafes);
    }
  });
};
