var controllers = {};
controllers.userController = function($scope, $location, AuthenticationService){
  $scope.data = {};
  $scope.showAlert = false;
/*
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
  }*/
}

angular.module('cartella_anest',['AuthenticationService']).controller(controllers)

console.log(controllers.userController);


/*app.controller('userController',
  ['$scope','$location','AuthenticationService',
    function ($scope, $location, AuthenticationService) {
      // reset login status


  }]);
*/
