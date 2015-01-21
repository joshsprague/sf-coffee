angular.module('cafes').controller('CafesController',
  ['$scope', '$routeParams', '$location', 'Cafes',
  function($scope, $routeParams, $location, Cafes) {

    $scope.find = function() {
      $scope.cafes = Cafes.query();
    };
  }]);
