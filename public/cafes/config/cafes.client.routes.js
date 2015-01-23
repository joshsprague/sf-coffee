angular.module('cafes').config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/cafes', {
      templateUrl: 'cafes/views/list-cafes.client.view.html'
    })
    .when('/map', {
      templateUrl: 'cafes/views/map.client.view.html'
    })
    .when('/test', {
      templateUrl: 'cafes/views/map-test.client.view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
