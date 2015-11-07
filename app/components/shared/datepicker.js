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
        });

})();
