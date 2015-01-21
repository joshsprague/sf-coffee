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

      //Set map to start at mobile location
      map.locate({setView: true, maxZoom: 16});

      function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
      }

      //Show error if can't get location
      map.on('locationfound', onLocationFound);
    };

    loadMap();
  }]);
