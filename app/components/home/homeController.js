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

        vm.showTab = 1;
        vm.showModal = false;

        vm.loadUser = loadUser;
        vm.loadDoctor = loadDoctor;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        vm.changeView = changeView;
        vm.cleanForm = cleanForm;
        vm.cleanSummaryC2s3 = cleanSummaryC2s3;
        vm.cleanAnalgesiaC1s1 = cleanAnalgesiaC1s1;
        vm.cleanAnalgesiaC1s2 = cleanAnalgesiaC1s2;
        vm.cleanAnalgesiaC1s4 = cleanAnalgesiaC1s4;
        vm.cleanAnalgesiaC1s9 = cleanAnalgesiaC1s9;

        vm.cleanAnestesiaC1 = cleanAnestesiaC1;
        vm.cleanAnestesiaC2s1 = cleanAnestesiaC2s1;
        vm.cleanAnestesiaC2s3 = cleanAnestesiaC2s3;
        vm.cleanAnestesiaC2s4 = cleanAnestesiaC2s4;
        vm.cleanAnestesiaC2s5 = cleanAnestesiaC2s5;
        vm.cleanAnestesiaC3s1 = cleanAnestesiaC3s1;
        vm.cleanAnestesiaC3s3 = cleanAnestesiaC3s3;
        vm.cleanAnestesiaC3s4 = cleanAnestesiaC3s4;
        vm.cleanAnestesiaC3s5 = cleanAnestesiaC3s5;
        vm.cleanAnestesiaC4s1 = cleanAnestesiaC4s1;

        vm.cleanTherapyC1s4 = cleanTherapyC1s4;
        vm.cleanTherapyC1s5 = cleanTherapyC1s5;

        vm.addTherapy = addTherapy;
        vm.loadTherapy = loadTherapy;

        //Submits
        vm.submitUser = submitUser;
        vm.submitDoctor = submitDoctor;
        vm.submitPatient = submitPatient;
        vm.submitInfo = submitInfo;

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
                OptionService.Get('studies').then(function(response){
                  vm.studies = response;
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
                        vm.data = response;
                        vm.data.Risk = vm.data.Risk || [];
                        vm.data.Consulence = vm.data.Consulence || [];
                        vm.data.Team = vm.data.Team || [];
                        vm.data.Therapy = vm.data.Therapy || [];
                        OptionService.Get('info').then(function(response){
                          vm.items = response;
                        });
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
          cleanForm();
          vm.template = next;

        }

        function cleanForm(){
          vm.data = {};
          if(vm.form)
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
          vm.data.ClinicId = vm.user.ClinicId;
          if(!vm.data.id)
            PatientService.Create(vm.data).then(function(response){
              vm.data.id = response.id;
              vm.patients.push({id : vm.data.id});
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

        function submitInfo(){
        }

        function cleanSummaryC2s3(){
          if(vm.data.Summary)
            if(vm.data.Summary.c2s2 == "SI"){
              vm.data.Summary.c2s3a = false;
              vm.data.Summary.c2s3b = false;
              vm.data.Summary.c2s3c = false;
              vm.data.Summary.c2s4 = "";
              vm.data.Summary.c2s5 = "";
            }

        }


        function cleanAnalgesiaC1s1(){
          if(vm.data.Analgesia.c1s1 == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questa pagina")){
              vm.data.Analgesia = {c1s1 : vm.data.Analgesia.c1s1};
              vm.data.Therapy = [];
              vm.data.Team = [];
              vm.therapy = {};
            }
        }
        function cleanAnalgesiaC1s2(){
            if(vm.data.Analgesia.c1s2 == "Nessuno"){
              delete vm.data.Analgesia.c1s3;
              delete vm.data.Analgesia.c1s4;
            }
          }
        function cleanAnalgesiaC1s4(){
          if(vm.data.Analgesia.c1s4 == "Nessuno")
            delete vm.data.Analgesia.c1s5;
        }
        function cleanAnalgesiaC1s9(){
          if(vm.data.Analgesia.c1s9 == 'No'){
            delete vm.data.Analgesia.c1s9a;
            delete vm.data.Analgesia.c1s9b;
            delete vm.data.Analgesia.c1s9c;
            vm.data.Therapy = [];
            vm.therapy = {};

          }
        }

        function cleanAnestesiaC1(){
          if(vm.data.Anestesia.c1 == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questa pagina")){
              vm.data.Anestesia = {c1 : vm.data.Anestesia.c1};
            }
        }
        function cleanAnestesiaC2s1(){
          if(vm.data.Anestesia.c2s1 == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questo blocco")){
              delete vm.data.Anestesia.c2s2;
              delete vm.data.Anestesia.c2s3;
              delete vm.data.Anestesia.c2s4;
              delete vm.data.Anestesia.c2s5;

              cleanAnestesiaC2s3();
              cleanAnestesiaC2s4();
              cleanAnestesiaC2s5();
            }
        }
        function cleanAnestesiaC2s3(){
          delete vm.data.Anestesia.c2s3a;
          delete vm.data.Anestesia.c2s3b;
          delete vm.data.Anestesia.c2s3c;
        }
        function cleanAnestesiaC2s4(){
          delete vm.data.Anestesia.c2s4a;
          delete vm.data.Anestesia.c2s4b;
          delete vm.data.Anestesia.c2s4c;
        }
        function cleanAnestesiaC2s5(){
          delete vm.data.Anestesia.c2s5a;
          delete vm.data.Anestesia.c2s5b;
        }

        function cleanAnestesiaC3s1(){
          if(vm.data.Anestesia.c3s1 == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questo blocco")){
              delete vm.data.Anestesia.c3s2a;
              delete vm.data.Anestesia.c3s2b;
              delete vm.data.Anestesia.c3s3;
              delete vm.data.Anestesia.c3s4;
              delete vm.data.Anestesia.c3s5;

              cleanAnestesiaC3s3();
              cleanAnestesiaC3s4();
              cleanAnestesiaC3s5();
            }
        }
        function cleanAnestesiaC3s3(){
          delete vm.data.Anestesia.c3s3a;
          delete vm.data.Anestesia.c3s3b;
          delete vm.data.Anestesia.c3s3c;
        }
        function cleanAnestesiaC3s4(){
          delete vm.data.Anestesia.c3s4a;
          delete vm.data.Anestesia.c3s4b;
          delete vm.data.Anestesia.c3s4c;
        }
        function cleanAnestesiaC3s5(){
          delete vm.data.Anestesia.c3s5a;
          delete vm.data.Anestesia.c3s5b;
          delete vm.data.Anestesia.c3s5c;
        }

        function cleanAnestesiaC4s1(){
          if(vm.data.Anestesia.c4s1 == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questo blocco")){
              delete vm.data.Anestesia.c4s2;
              delete vm.data.Anestesia.c4s2a;
              delete vm.data.Anestesia.c4s3;
              delete vm.data.Anestesia.c4s3a;
              delete vm.data.Anestesia.c4s4;
              delete vm.data.Anestesia.c4s5;
              delete vm.data.Anestesia.c4s6;
              delete vm.data.Anestesia.c4s7;
            }
        }

        function cleanTherapyC1s4(){
          delete vm.therapy.c1s4a;
          delete vm.therapy.c1s4b;
          delete vm.therapy.c1s4c;
        }
        function cleanTherapyC1s5(){
          delete vm.therapy.c1s5a;
          delete vm.therapy.c1s5b;
          delete vm.therapy.c1s5c;
        }

        function addTherapy(){
          vm.data.Therapy.push(vm.therapy);
          vm.therapy = {};
          vm.showModal = !vm.showModal;

        }
        function loadTherapy(id){
          vm.therapy = vm.data.Therapy[id];
          vm.showModal = !vm.showModal;

        }
        // TEMPLATE
    }

})();
