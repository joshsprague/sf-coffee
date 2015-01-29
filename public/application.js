var mainAppModuleName = 'sf-coffee';

var mainAppModule = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'cafes', 'users', 'snap']);

mainAppModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainAppModuleName]);
});
