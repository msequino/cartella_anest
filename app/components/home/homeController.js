
angular.module('cartellaAnestApp',[]).controller('homeController',
  ['$scope', '$rootScope', '$location','AuthenticationService',
      function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status

        $scope.data = {};
        $scope.showAlert = false;

    }]).directive('notification', function($timeout){
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
