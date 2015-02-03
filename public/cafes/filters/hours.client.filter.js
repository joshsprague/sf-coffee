angular.module('cafes').filter('hours', function() {
  return function(time) {
    time = time || '';
    var militaryHour = parseInt(time.substring(0,2));
    var standardHour = ((militaryHour + 11) % 12) + 1;
    var amPm = militaryHour > 11 ? 'pm' : 'am';
    var minutes = time.substring(2);

    return standardHour + ':' + minutes + ' ' + amPm;
  };
});
