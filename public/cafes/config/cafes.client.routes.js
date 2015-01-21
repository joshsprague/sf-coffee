angular.module('cafes').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/cafes', {
      templateUrl: 'cafes/views/list-cafes.client.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
