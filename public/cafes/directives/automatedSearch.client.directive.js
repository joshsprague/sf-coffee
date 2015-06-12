(function() {
  'use strict';

  angular
    .module('app')
    .directive('automatedSearch', automatedSearch);

  automatedSearch.$inject = ['dataservice', '$parse'];

  function automatedSearch(dataservice, $parse) {
    var directive = {
      restrict: 'A',
      link: link,
      template: automatedSearchTemplate
    };

    return directive;

    function link(scope, element, attrs) {
      var vm = scope;

      vm.entity = attrs.entity;
      vm.entityParam = attrs.entityParam;
      vm.currentIndex = -1;
      vm.searchData = {};
      vm.searchInput = "";
      vm.searchResults = [];
      vm.selected = {};
      vm.showResults = false;
      vm.onInput = onInput;
      vm.onKeyboard = onKeyboard;
      vm.onSelect = onSelect;
      vm.getClass = getClass;

      activate();

      function activate() {
        return dataservice.getSearchData(vm.entity).then(function(response) {
          vm.searchData = response.data;

          return vm.searchData;
        });
      }

      function getResults(searchStr) {
        var results = [];
        searchStr = searchStr.toLowerCase();

        for (var i = 0; i < vm.searchData.length; i++) {
          if (vm.searchData[i].name.toLowerCase().indexOf(searchStr) !== -1 && results.length < 10) {
            results.push(vm.searchData[i]);
          }
        }

        return results;
      }

      function onInput() {
        if (vm.searchInput === "" || !vm.searchInput) {
          vm.showResults = false;

        } else {
          vm.showResults = true;
          vm.searchResults = getResults(vm.searchInput);
        }
      }

      function onKeyboard(event) {
        // Up and down arrows traverse results and loop at top and bottom
        if(event.which === 40) {
          if(vm.searchResults.length) {
            if(vm.currentIndex === vm.searchResults.length - 1) {
              vm.currentIndex = 0;
            }
            else {
              vm.currentIndex++;
            }
          }
        }
        if(event.which === 38) {
          if(vm.searchResults.length) {
            if(vm.currentIndex === 0) {
              vm.currentIndex = vm.searchResults.length - 1;
            }
            else {
              vm.currentIndex--;
            }
          }
        }
        // Enter key selects highlighted result
        if(event.which === 13) {
          if(vm.searchResults.length && vm.currentIndex >= 0) {
            vm.selected = vm.searchResults[vm.currentIndex];
            vm.searchInput = vm.searchResults[vm.currentIndex][vm.entityParam];
            vm.showResults = false;
            vm.currentIndex = -1;
          }
        }
      }

      function onSelect(result) {
        vm.selected = result;
        vm.searchInput = result[vm.entityParam];
        vm.showResults = false;
        vm.currentIndex = -1;
      }

      function getClass(index) {
        if(index === vm.currentIndex) {
          return 'ta-selected-result';
        }
        else {
          return 'ta-unselected-result';
        }
      }
    }

    var automatedSearchTemplate = '\
      <div class="ta-search-container" ng-keyup="onKeyboard($event)">\
        <input class="ta-input" ng-model="searchInput" ng-keyup="onInput()" placeholder="search">\
        <div class="ta-dropdown" ng-if="showResults">\
          <div class="ta-dropdown-result" ng-repeat="result in searchResults" ng-click="onSelect(result)" ng-class="getClass($index)" >\
            {{result[entityParam]}}\
          </div>\
        </div>\
      </div>'
  }
})();
