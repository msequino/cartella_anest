
angular.module('cartellaAnestApp',[]).controller('userController',
  ['$scope', '$rootScope', '$location',
      function ($scope, $rootScope, $location) {
        // reset login status
//        AuthenticationService.ClearCredentials();
        $scope.data = {};

        $scope.login = function () {
            $scope.dataLoading = true;
            console.log($scope.data);
            /*AuthenticationService.Login(data, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });*/
        };
    }]);
