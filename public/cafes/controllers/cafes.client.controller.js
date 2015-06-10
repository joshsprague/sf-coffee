angular
  .module('cafes')
  .controller('CafesController', CafesController);

  CafesController.$inject = ['$routeParams', '$location', '$sce', 'Cafes']

  function CafesController($routeParams, $location, $sce, Cafes) {
    var vm = this;

    vm.cafes = [];
    vm.cafe = {};
    vm.find = find;
    vm.findOne = findOne;
    vm.update = update;
    vm.renderHtml = renderHtml;

    function find() {
      vm.cafes = Cafes.query();
    };

    function findOne() {
      vm.cafe = Cafes.get({
        cafeId: $routeParams.cafeId
      });
    };

    function update() {
      vm.cafe.$update(function() {
        $location.path('cafes/' + vm.cafe._id);
      }, function(errorResponse) {
        vm.error = errorResponse.data.message;
      });
    };

    function renderHtml(html_code) {
      return $sce.trustAsHtml(html_code);
    };

  };
