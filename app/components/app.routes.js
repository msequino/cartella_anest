angular.module('cartella_anest',['ngRoute'])
.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/#', {
        templateUrl: 'components/user/userView.html',
        controller: 'userCtrl'
      }).
      when('/#/index', {
        templateUrl: 'components/home/homeView.html',
        controller: 'homeCtrl',
        resolve: { loggedin: checkLoggedin }
      }).
      otherwise({
        redirectTo: '/#'
      });
  }]).config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push(function($q,$location){
      return {
        response: function(response){
          console.log(response);
          return response;
        },
        responseError: function(response){
          console.log(response);
          if(response.status === 401)
            $location.url('/#');
          return $q.reject(response);
        }
      };
    });
  }]);
