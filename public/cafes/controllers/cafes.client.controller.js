(function() {

  angular
    .module('cafes')
    .controller('CafesController', CafesController);

    CafesController.$inject = ['$routeParams', '$location', '$sce', 'Cafes', 'dataservice']

    function CafesController($routeParams, $location, $sce, Cafes, dataservice) {
      var vm = this;

      vm.cafes = [];
      vm.cafe = {};
      vm.renderHtml = renderHtml;

      activate();

      function renderHtml(html_code) {
        return $sce.trustAsHtml(html_code);
      }

      function activate() {
        return getCafes().then(function() {
          console.log('Activated Cafes View');
        });
      }

      function getCafes() {
        return dataservice.getCafes().then(function(data) {
          vm.cafes = data;
          return vm.cafes;
        })
      }
    };

})();
