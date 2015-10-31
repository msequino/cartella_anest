var app = angular.module('masterApp',[
  'ngRoute',
  'ngCookies',
  'homeController'
]).
  config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/index',{
          templateUrl : 'components/home/homeView.html',
          controller : 'homeCtrl'
        }).
        otherwise({
          redirectTo : '/index'
        });
    }]);
