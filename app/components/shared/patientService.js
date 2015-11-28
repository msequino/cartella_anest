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
            return $http.get('/cartella_anest/patients').then(handleSuccess, handleError('Error getting all patients'));
        }

        function GetById(id) {
            return $http.get('/cartella_anest/patients/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function Create(user) {
            return $http.post('/cartella_anest/patients', user).then(handleSuccess, handleError);
        }

        function CreateInfo(info,table) {
            return $http.post('/cartella_anest/info/'+table, info).then(handleSuccess, handleError);
        }
        function SaveTInfo(info,id,table) {
            return $http.post('/cartella_anest/info/'+ table + '/'+id, info).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/cartella_anest/patients/' + user.id, user).then(handleSuccess, handleError);
        }

        function UpdateInfo(info,table) {
            return $http.put('/cartella_anest/info/' + table +'/' + info.id, info).then(handleSuccess, handleError);
        }

        function Delete(id) {
            return $http.delete('/cartella_anest/patients/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function DeleteTInfo(path) {
            return $http.delete(path).then(handleSuccess, handleError('Error deleting user'));
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
