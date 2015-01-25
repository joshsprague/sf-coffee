var mongoose = require('mongoose'),
  Cafe = mongoose.model('Cafe');

var getErrorMessage = function(err) {
  if (err.errors) {
    for(var errName in err.errors) {
      if (err.errors[errName].message) {
        return err.errors[errName].message;
      } else {
        return 'Unknown server error';
      }
    }
  }
};

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

exports.read = function(req, res) {
  res.json(req.cafe);
};

exports.update = function(req, res) {
  var cafe = req.cafe;

  cafe.name = req.body.name;
  cafe.description = req.body.description;

  cafe.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(cafe);
    }
  });
};

exports.delete = function(req, res) {
  var cafe = req.cafe;

  cafe.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};
