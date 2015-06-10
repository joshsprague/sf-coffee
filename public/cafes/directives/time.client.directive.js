(function() {

  angular
    .module('cafes')
    .directive('myCurrentTime', myCurrentTime);

    myCurrentTime.$inject = ['$interval', 'dateFilter'];

    function myCurrentTime($interval, dateFilter) {

      return function(scope, element, attrs) {
        var format,  // date format
            stopTime;

        function updateTime() {
          element.text(dateFilter(new Date(), format));
        }

        scope.$watch(attrs.myCurrentTime, function(value) {
          format = value;
          updateTime();
        });

        stopTime = $interval(updateTime, 1000);

        element.on('$destroy', function() {
          $interval.cancel(stopTime);
        });
      }
    };

})();
