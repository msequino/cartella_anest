var app = angular.module('cartellaAnestApp',[
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'homeController',
  'ui.router',
  'ui.bootstrap',
  'ui.slider']).
  config(['$httpProvider',function($httpProvider){
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
