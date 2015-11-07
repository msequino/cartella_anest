(function () {
    'use strict';

    angular
        .module('app')
        .factory('DoctorService', DoctorService);

    DoctorService.$inject = ['$http'];
    function DoctorService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/doctors').then(handleSuccess, handleError('Error getting all doctors'));
        }

        function GetById(id) {
            return $http.get('/doctors/' + id).then(handleSuccess, handleError('Error getting doctor by id'));
        }

        function Create(doctor) {
            return $http.post('/doctors', doctor).then(handleSuccess, handleError);
        }

        function Update(doctor) {
            return $http.put('/doctors/' + doctor.id, doctor).then(handleSuccess, handleError('Error updating doctor'));
        }

        function Delete(id) {
            return $http.delete('/doctors/' + id).then(handleSuccess, handleError('Error deleting doctor'));
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
