angular.module('cafes').factory('Cafes', ['$http', '$scope', function($http, $scope){
  $http.get('/api/cafes').
    success(function(cafes) {
      console.log('cafes: ', cafes);
      $scope.cafes = cafes;
    }).
    error(function(err) {
      console.log(err);
    });
}]);
