(function () {
    'use strict';

    angular
        .module('app')
        .filter('byRole', function(){
          return function(doctors,filters){
            var out = [];
            if(filters){
              var check1 = (filters[1] ? 1 : 0);
              var check2 = (filters[2] ? 2 : 0);
              var check3 = (filters[3] ? 3 : 0);
              out = [];
              for(var doctor in doctors){
                if(doctors[doctor].RoleId == check1 || doctors[doctor].RoleId == check2 || doctors[doctor].RoleId == check3)
                  out.push(doctors[doctor]);
              }
            }
            else {
              out = doctors;
            }

            return out;
          }
        });

})();
