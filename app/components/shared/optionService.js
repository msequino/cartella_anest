(function () {
    'use strict';

    angular
        .module('app')
        .factory('OptionService', OptionService);

    OptionService.$inject = ['$http'];
    function OptionService($http) {
        var service = {};

        service.Get = Get;

        return service;

        function Get(item) {
            return $http.get('/cartella_anest/'+item).then(handleSuccess, handleError('Error getting all '+ item));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
