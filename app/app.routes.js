var app = angular.module('cartellaAnestApp',[
  'ngRoute',
//  'ngCookies',
  'AuthenticationService',
  'userController'
]).
  config(['$routeProvider',
    function($routeProvider){
      debugger;
      $routeProvider.
        when('/',{
          templateUrl : 'components/user/userView.html',
          controller : 'userCtrl',
        }).
/*        when('/index',{
          templateUrl : 'components/home/homeView.html',
          controller : 'homeCtrl'
        }).*/
        otherwise({
          redirectTo : '/'
        });
    }]);
