(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'PatientService', 'DoctorService', 'AuthenticationService', 'OptionService', '$rootScope', '$location', '$timeout'];
    function HomeController(UserService, PatientService, DoctorService, AuthenticationService, OptionService, $rootScope, $location, $timeout) {
        var vm = this;

        vm.check = {};
        vm.check[1] = true;
        vm.check[2] = true;
        vm.check[3] = true;

        vm.loadUser = loadUser;
        vm.loadDoctor = loadDoctor;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.changeView = changeView;
        vm.cleanForm = cleanForm;
        //Submits
        vm.submitUser = submitUser;
        vm.submitDoctor = submitDoctor;
        vm.submitPatient = submitPatient;

        initController();

        function initController() {
            AuthenticationService.GetSession(function(response){
              if(!response){
                AuthenticationService.ClearCredentials();
                $location.path("/login");
              }
              else{
                vm.user = response;
                OptionService.Get('clinics').then(function(response){
                  vm.clinics = response;
                });
                OptionService.Get('groups').then(function(response){
                  vm.groups = response;
                });
                OptionService.Get('roles').then(function(response){
                  vm.roles = response;
                });
                PatientService.GetAll().then(function(response){
                  vm.patients = response;
                });
                vm.template = 'components/home/homepage.html';

              }
            });
        }
        function logout() {
          AuthenticationService.Logout(function(){
            AuthenticationService.ClearCredentials();
            $location.path('/login');
          });
        }

        //Profile functionalities
        function loadUser(id) {
            UserService.GetById(id)
                .then(function (user) {
                    vm.data = user;
                });
        }
        function loadDoctor(id) {
            DoctorService.GetById(id)
                .then(function (doctor) {
                    vm.data = doctor;
                });
        }

//OLD
        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
//OLD

        //USER functionality

        // TEMPLATE
        function changeView(next,loadItems,id){
          vm.template = next;
          if(loadItems == 1) //Load Users
            UserService.GetAll().then(function (response) {
              vm.users = response;
            });
          else{
            if(loadItems == 2) //Load doctors
              DoctorService.GetAll().then(function (response) {
                vm.doctors = response;
              });
              else{
                if(loadItems == 3) //Load patients
                  PatientService.GetAll().then(function (response) {
                    vm.patients = response;
                  });
                  else{
                    if(loadItems == 4 && id) //Load patient with id
                      PatientService.GetById(id).then(function (response) {
                        vm.patients = response;
                      });
                      else{
                        if(loadItems == 5) //Load patient with id
                          UserService.GetByUsername(vm.user.username).then(function (response) {
                            vm.data = response;
                          });
                      }
                  }
              }
          }
        }

        function cleanForm(){
          vm.data = {};
          vm.form.$setPristine();
        }

        function submitUser(changePage){
          if(!vm.data.id)
            UserService.Create(vm.data).then(function(response){
              vm.data.password = null;
              vm.data.ClinicId = null;
              vm.data.GroupId = null;
              vm.users.push(vm.data);
              cleanForm();
            });
          else{
            if(!vm.data.password || vm.data.password.length == 0) vm.data.password = null;
            UserService.Update(vm.data).then(function(response){
              if(changePage){
                vm.success = true;
                $timeout(function () {
                  vm.success = false;
                  changeView('components/home/homepage.html');
                }, 3000);
              }else {
                var line = angular.element(document.querySelector("#user"+vm.data.id));
                line.children().text(vm.data.name + " " + vm.data.surname);
                line.removeClass("success");
                line.removeClass("danger");
                line.addClass((vm.data.active == 1 ? "success" : "danger"));
                cleanForm();                
              }
            });
          }
        }

        function submitDoctor(){
          if(!vm.data.id)
            DoctorService.Create(vm.data).then(function(response){
              vm.data.id = response.id;
              vm.doctors.push(vm.data);
              cleanForm();
            });
          else{
            DoctorService.Update(vm.data).then(function(response){
              var line = angular.element(document.querySelector("#user"+vm.data.id));
              line.children().text(vm.data.name + " " + vm.data.surname);
              cleanForm();
            });
          }
        }

        function submitPatient(){
          if(!vm.data.id)
            PatientService.Create(vm.data).then(function(response){
              vm.data.id = response.id;
              vm.patients.push(vm.data);
              //INVIA paziente via mail
              angular.element("#link").attr("href", angular.element("#link").attr("href") +
                          vm.data.name + "%2c" +
                          vm.data.surname + "%2c" +
                          vm.data.birth + "%2c" +
                          vm.data.code);
              //angular.element("#link").trigger('click');
              vm.success = true;
              cleanForm();

              $timeout(function () {
                vm.success = false;
                changeView('components/home/homepage.html');
              }, 3000);
            });
        }
        // TEMPLATE
    }

})();
