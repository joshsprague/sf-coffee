(function() {

  angular
    .module('cafes')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$location'];

  function dataservice($http, $location) {
    var service = {
      getCafes: getCafes
    };

    return service;

    function getCafes() {
      return $http.get('/api/cafes')
        .then(getCafesComplete)
        .catch(getCafesFailed);

      function getCafesComplete(response) {
        console.log('response', response)
        return response.data;
      }

      function getCafesFailed(error) {
        console.log('XHR failed for getCafes' + error.data);
      }
    }
  }
})();
