(function () {
    'use strict';

    angular
        .module('app')
        .factory('PatientService', PatientService);

    PatientService.$inject = ['$http'];
    function PatientService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.CreateInfo = CreateInfo;
        service.UpdateInfo = UpdateInfo;
        service.Delete = Delete;
        service.SaveTInfo = SaveTInfo;
        service.DeleteTInfo = DeleteTInfo;

        return service;

        function GetAll() {
            return $http.get('/patients').then(handleSuccess, handleError('Error getting all patients'));
        }

        function GetById(id) {
            return $http.get('/patients/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(user) {
            return $http.post('/patients', user).then(handleSuccess, handleError);
        }

        function CreateInfo(info,table) {
            return $http.post('/info/'+table, info).then(handleSuccess, handleError);
        }
        function SaveTInfo(info,id,table) {
            return $http.post('/info/'+ table + '/'+id, info).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/patients/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function UpdateInfo(info,table) {
            return $http.put('/info/' + table +'/' + info.id, info).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/patients/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function DeleteTInfo(path) {
            return $http.delete(path).then(handleSuccess, handleError('Error deleting user'));
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
