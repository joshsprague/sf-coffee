angular.module('cafes').controller('MapsController',
  ['$scope', 'leafletData', '$routeParams', '$location', 'Cafes',
  function($scope, leafletData, $routeParams, $location, Cafes) {
    angular.extend($scope, {
      defaults: {
        tileLayer: new L.StamenTileLayer("toner-lite"),
        maxZoom: 16
      },
      center: {
        lat: 51.505,
        lng: -0.09,
        zoom: 8
      }
    });

    leafletData.getMap().then(function(map) {
      map.locate({setView: true, maxZoom: 16});
    });
  }]);
