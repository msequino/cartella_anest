
angular.module('cartellaAnestApp',[]).controller('userCtrl',
  ['$scope', '$rootScope', '$location',
    function ($scope, $rootScope, $location) {
        // reset login status
        //AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            /*AuthenticationService.Login($scope.username, $scope.password, function(response) {
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
