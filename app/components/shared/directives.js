(function () {
    'use strict';

    angular
        .module('app')
        .directive('datepicker', function(){
          return{
            restrict : 'A',
            require : 'ngModel',
            link : function(scope,element,attrs,ngModelCtrl){
              $(function(){
                element.datepicker({
                  dateFormat : "yy-mm-dd",
                  showOn : "button",
                  onSelect : function(date){
                    ngModelCtrl.$setViewValue(date)
                    scope.$apply();

                  }
                });
              })
            }
          }
        })
        .directive('modal', function () {
          return {
              restrict: 'EA',
              scope: {
                  title: '=modalTitle',
                  header: '=modalHeader',
                  body: '=modalBody',
                  footer: '=modalFooter',
                  callbackbuttonleft: '&ngClickLeftButton',
                  callbackbuttonright: '&ngClickRightButton',
                  handler: '=lolo'
              },
              templateUrl: 'partialmodal.html',
              transclude: true,
              controller: function ($scope) {
                  $scope.handler = 'pop';
              },
          };
      });

})();
