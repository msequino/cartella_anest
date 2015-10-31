var app = angular.module('cartellaAnestApp',[
  'ngRoute',
  'ngResource',
  'ngCookies',
  'AuthenticationService',
  'userController'
])
.config(['$routeProvider',
  function($routeProvider) {
    console.log($routeProvider);
    $routeProvider.
      when('/', {
//        templateUrl: 'components/user/userViev.html',
  //      controller: 'userCtrl'
      }).
      when('/index', {
//        templateUrl: 'partials/phone-detail.html',
//        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }])
  .config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push(function($q,$location){
      return {
        response: function(response){
          return response;
        },
        responseError: function(response){
          if(response.status === 401)
            $location.url('/');
          return $q.reject(response);
        }
      };
    });
  }]);
