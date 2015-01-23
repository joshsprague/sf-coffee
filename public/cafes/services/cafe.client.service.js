angular.module('cafes').factory('Cafe', ['$resource', function($resource) {
  return $resource('api/cafes/:cafeId', {
    cafeId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
