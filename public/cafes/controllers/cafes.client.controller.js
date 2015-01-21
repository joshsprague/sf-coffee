angular.module('cafes').controller('CafesController',
  ['$scope', '$routeParams', '$location', 'Cafes',
  function($scope, $routeParams, $location, Cafes) {

    var layer = new L.StamenTileLayer("toner-lite");
    var map = new L.Map("map", {
      center: new L.LatLng(37.75, -122.45),
      zoom: 12
    });

    $scope.find = function() {
      $scope.cafes = Cafes.query();
    };

    var loadMap = function() {

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

    var loadCafes = function() {
      var cafes = Cafes.query(function() {
        var redIcon = L.icon({
          iconUrl: 'img/redCoffeeMug.png'
        });

        var redIconBox = L.icon({
          iconUrl: 'img/redCoffee.png'
        });

        console.log('cafe[0]', cafes[0]["coordinates"]["longitude"]);
        for (var i = 0; i < cafes.length; i++) {
          L.marker([cafes[i]["coordinates"]["longitude"], cafes[i]["coordinates"]["latitude"]], {icon: redIconBox}).bindPopup(cafes[i]["name"]+"<br>"+cafes[i]["description"]).addTo(map);
        };
      });
    };


    loadMap();
    loadCafes();
  }]);
