angular.module('cafes').factory('Cafes', ['$resource', function($resource) {
  return $resource('api/cafes/:cafeId', {
    cafeId: '@_id'
  }, {
    update: {
      method: 'PUT'
    }
  });
}]);
