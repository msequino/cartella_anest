
var app = angular.module('cartella_anest',['userController'])
.factory('AuthenticationService',['$http','$rootScope',
  function($http,$rootScope){

    return {
      Login : function(data,callback){
      },
      isLogin : function(data,callback){
        $http.get('/auth/loggedin',data).success(function(data){
          console.log(data);
          return callback(false,data);
        }).error(function(err){
          return callback(true,err);

        });
      }
    }
  }
]);
