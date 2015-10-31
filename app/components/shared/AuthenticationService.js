'use strict';

angular.module('cartellaAnestApp',[])

.factory('AuthenticationService',['$http',
  function($http){

    return {
      Login : function(data){
        $http.post('/login',data).success(function(data){
          console.log(data);
        }).error(function(){

        });
      }
    }
  }
]);
