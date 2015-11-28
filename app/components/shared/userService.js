(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/cartella_anest/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/cartella_anest/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/cartella_anest/user/' + username).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(user) {
            return $http.post('/cartella_anest/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/cartella_anest/users/' + user.id, user).then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete('/cartella_anest/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return { success: false, message: error };
        }
    }

})();
