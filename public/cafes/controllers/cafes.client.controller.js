angular.module('cafes').controller('CafesController',
  ['$scope', '$routeParams', '$location', 'Cafes',
  function($scope, $routeParams, $location, Cafes) {

    $scope.find = function() {
      $scope.cafes = Cafes.query();
    };

    var loadMap = function() {
      var layer = new L.StamenTileLayer("toner-lite");
      var map = new L.Map("map", {
        center: new L.LatLng(37.75, -122.45),
        zoom: 12
      });

      map.addLayer(layer);

      map.locate({setView: true, maxZoom: 16});
    }

    loadMap();
  }]);
