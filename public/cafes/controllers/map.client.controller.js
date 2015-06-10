(function() {

angular
  .module('cafes')
  .controller('MapController', MapController);

  MapController.$inject = ['$routeParams', '$location', 'Cafes', 'snapRemote', 'dataservice']

  function MapController($routeParams, $location, Cafes, snapRemote, dataservice) {
    var vm = this;

    vm.cafes = [];
    vm.cafe = {};
    vm.format = "h:mm a";
    vm.layer = new L.StamenTileLayer("toner-lite");
    vm.map = new L.Map("map", {
      center: new L.LatLng(37.75, -122.45),
      zoom: 12,
      zoomControl: false
    });
    vm.markers = new L.MarkerClusterGroup({
      "disableClusteringAtZoom": 15
    });

    vm.clearMarkers = clearMarkers;
    vm.find = find;
    vm.findOpenNow = findOpenNow;
    vm.loadCafes = loadCafes;
    vm.loadMap = loadMap;
    vm.openSidebar = openSidebar;
    vm.reloadCafes = reloadCafes;

    vm.map.addControl(L.control.zoom({position: 'bottomright'}));

    activate();

    function activate() {
        return getCafes().then(function() {
          console.log('Activated Map View');
          vm.loadMap();
          vm.loadCafes(vm.cafes);
        });
      }

      function getCafes() {
        return dataservice.getCafes().then(function(data) {
          vm.cafes = data;
          return vm.cafes;
        })
      }

    function loadMap() {

      vm.map.addLayer(vm.layer);

      //Set map to start at mobile location
      vm.map.locate({setView: true, maxZoom: 16});

      function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(vm.map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(vm.map);
      }

      //Show error if can't get location
      vm.map.on('locationfound', onLocationFound);
    };

    function loadCafes(cafes, options) {
      if (vm.markers) {
        vm.clearMarkers();
      }

      var redIcon = L.icon({
        iconUrl: 'img/redCoffeeMug.png'
      });

      var redIconBox = L.icon({
        iconUrl: 'img/redCoffee.png'
      });

      function getHoursTemplate(cafe) {
        var template = "<div class='hours'><table>"
        var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        function formatHour(time) {
          time = time || '';
          var militaryHour = parseInt(time.substring(0,2));
          var standardHour = ((militaryHour + 11) % 12) + 1;
          var amPm = militaryHour > 11 ? 'pm' : 'am';
          var minutes = time.substring(2);

          return standardHour + ':' + minutes + amPm;
        };

        for (var i = 0; i < cafe.hours.open.length; i++) {
          template = template + "<tr><td class='day'>" + days[i] + "</td><td class='hour'>" + formatHour(cafe.hours.open[i]) + " - " + formatHour(cafe.hours.close[i]) + "</td></tr>";
        };

        template = template + "</table></div>";

        return template;
      };

      if (options) {
        cafes = vm.findOpenNow(cafes);
        snapRemote.close();
      }
      for (var i = 0; i < cafes.length; i++) {
        var marker = L.marker([cafes[i]["coordinates"]["longitude"], cafes[i]["coordinates"]["latitude"]], {icon: redIconBox});
        marker.bindPopup(cafes[i]["name"]+"<br>"+ getHoursTemplate(cafes[i]));

        vm.markers.addLayer(marker);
      };

      vm.map.addLayer(vm.markers);
    };

    function clearMarkers() {
      vm.map.removeLayer(vm.markers);
      vm.markers.clearLayers();
    };

    function findOpenNow(cafes) {
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

    function reloadCafes() {
      vm.loadCafes(vm.cafes, "open")
    };

    function openSidebar() {
      angular.element('.map-sidebar').css('display', 'block')
    }
  }

})();
