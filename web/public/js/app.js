var app = angular.module('ecomony', ['ngRoute', 'ngResource']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/administration', {
        templateUrl: 'templates/administration.html',
        controller: 'AdministrationController'
      }).
      when('/costs', {
          templateUrl: 'templates/costs.html',
          controller: 'CostsController'
      }).
      when('/budget', {
            templateUrl: 'templates/budget.html',
            controller: 'BudgetController'
      }).
      otherwise({
        redirectTo: '/administration'
      });
  }]);