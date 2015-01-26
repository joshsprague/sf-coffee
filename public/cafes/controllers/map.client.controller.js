angular.module('cafes').controller('MapController',
  ['$scope', '$routeParams', '$location', 'Cafe',
  function($scope, $routeParams, $location, Cafe) {

    $scope.layer = new L.StamenTileLayer("toner-lite");
    $scope.map = new L.Map("map", {
      center: new L.LatLng(37.75, -122.45),
      zoom: 12,
      zoomControl: false
    });
    $scope.markers = new L.FeatureGroup();

    $scope.map.addControl(L.control.zoom({position: 'bottomright'}));

    $scope.openTimeOptions = [{
      time: 500,
      label: "Before 5"
    }, {
      time: 600,
      label: "Before 6"
    }, {
      time: 700,
      label: "Before 7"
    }];

    $scope.find = function() {
      $scope.cafes = Cafe.query();
    };

    $scope.findOne = function() {
      $scope.cafe = Cafe.get({
        cafeId: $routeParams.cafeId
      });
    };

    $scope.update = function() {
      $scope.cafe.$update(function() {
        $location.path('cafes/' + $scope.cafe._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.loadMap = function() {

      $scope.map.addLayer($scope.layer);

      //Set map to start at mobile location
      $scope.map.locate({setView: true, maxZoom: 16});

      function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo($scope.map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo($scope.map);
      }

      //Show error if can't get location
      $scope.map.on('locationfound', onLocationFound);
    };

    $scope.loadCafes = function(cafes, options) {
      if ($scope.markers) {
        $scope.clearMarkers();
      }

      var redIcon = L.icon({
        iconUrl: 'img/redCoffeeMug.png'
      });

      var redIconBox = L.icon({
        iconUrl: 'img/redCoffee.png'
      });

      var getHoursTemplate = function(cafe) {
        var template = "<div class='hours'><ul>"
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        for (var i = 0; i < cafe.hours.open.length; i++) {
          template = template + "<li>" + days[i] + ": " + cafe.hours.open[i] + " - " + cafe.hours.close[i] + "</li>";
        };

        template = template + "</ul></div>";

        return template;
      };

      if (options) {
        cafes = $scope.findOpenNow(cafes);
      }
      for (var i = 0; i < cafes.length; i++) {
        console.log('hours', getHoursTemplate(cafes[i]));
        var marker = L.marker([cafes[i]["coordinates"]["longitude"], cafes[i]["coordinates"]["latitude"]], {icon: redIconBox});
        marker.bindPopup(cafes[i]["name"]+"<br>"+ getHoursTemplate(cafes[i]));

        $scope.markers.addLayer(marker);
      };

      $scope.map.addLayer($scope.markers);
    };

    $scope.clearMarkers = function() {
      $scope.map.removeLayer($scope.markers);
      $scope.markers.clearLayers();
    };

    $scope.findOpenNow = function(cafes) {
      var openCafes = [];
      var today = new Date();
      var day = today.getDay();
      var hour = today.getHours();
      var minutes = today.getMinutes();
      var time = parseInt(hour.toString() + (Math.ceil(minutes/10) * 10).toString());

      for(var i = 0; i < cafes.length; i++) {
        if (cafes[i]["hours"]["open"][day] < time && cafes[i]["hours"]["close"][day] > time) {
          openCafes.push(cafes[i]);
        }
      }

      return openCafes;
    };

    $scope.reloadCafes = function() {
      $scope.loadCafes($scope.cafes, "open")
    };

    var cafes = Cafe.query(function() {
      $scope.cafes = cafes;

      $scope.loadMap();
      $scope.loadCafes(cafes);
    });

  }]);
