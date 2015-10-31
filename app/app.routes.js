var app = angular.module('cartellaAnestApp',[
  'ngRoute',
  'ngCookies',
  'userController',
  'AuthenticationService'
]).
  config(['$routeProvider',
    function($routeProvider){
      $routeProvider.
        when('/',{
          templateUrl : 'components/user/userView.html',
          controller : 'userCtrl'
        }).
        when('/index',{
          templateUrl : 'components/home/homeView.html',
          controller : 'homeCtrl'
        }).
        otherwise({
          redirectTo : '/index'
        });
    }]).run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
