angular.module('cafes').controller('CafesController',
  ['$scope', '$routeParams', '$location', 'Cafe',
  function($scope, $routeParams, $location, Cafe) {

    $scope.find = function() {
      $scope.cafes = Cafe.query();
    };

    $scope.findOne = function() {
      $scope.cafe = Cafe.get({
        cafeId: $routeParams.cafeId
      });
    };

    $scope.update = function() {
      $scope.cafe.$update(function() {
        $location.path('cafes/' + $scope.cafe._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

  }]);
