
angular.module('cartellaAnestApp',[]).controller('userController',
  ['$scope', '$rootScope', '$location','AuthenticationService',
      function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status

        $scope.data = {};
        $scope.showAlert = false;

        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.data, function(err,response) {
                if(!err) {
                    $location.path('/index');
                    $scope.showAlert = true;
                  } else {
                    $scope.showAlert = false;
                    $scope.dataLoading = false;
                }
            });
        };
    }]).factory('AuthenticationService',['$http','$rootScope',
      function($http,$rootScope){

        return {
          Login : function(data,callback){
            $http.post('/auth/login',data).success(function(data){
              return callback(false,data);
            }).error(function(err){
              return callback(true,err);

            });
          }
        }
      }
    ]).directive('notification', function($timeout){
      return {
         restrict: 'E',
         replace: true,
         scope: {
             ngModel: '='
         },
         template: '<div class="alert alert-danger" bs-alert="ngModel" >Riprova</div>',
         link: function(scope, element, attrs){
         }
      }
});
