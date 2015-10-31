
angular.module('cartellaAnestApp',[]).controller('userCtrl',
  ['$scope', '$rootScope', '$location','AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        //AuthenticationService.ClearCredentials();

        $scope.login = function () {
            $scope.dataLoading = true;
            var data = {username : $scope.username , password : $scope.password};
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
