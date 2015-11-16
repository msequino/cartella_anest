(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'PatientService', 'DoctorService', 'AuthenticationService', 'OptionService', 'StudyService', '$rootScope', '$location', '$timeout'];
    function HomeController(UserService, PatientService, DoctorService, AuthenticationService, OptionService, StudyService, $rootScope, $location, $timeout) {
        var vm = this;
        vm.today = new Date();
        vm.check = {};
        vm.check[1] = true;
        vm.check[2] = true;
        vm.check[3] = true;

        vm.showTab = 1;
        vm.showModal = false;

        vm.loadUser = loadUser;
        vm.loadDoctor = loadDoctor;
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
        vm.closeTherapy = closeTherapy;

        vm.deleteFromArray = deleteFromArray;
        //Submits
        vm.submitUser = submitUser;
        vm.submitDoctor = submitDoctor;
        vm.submitPatient = submitPatient;
        vm.submitInfo = submitInfo;
        vm.submitStudy = submitStudy;

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
          console.log(id);
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
                        vm.showTab = 1;
                        vm.data = response || {};
                        vm.data.StudyId = response.Patient.StudyId;
                        vm.data.Summary = response.Summary || null;
                        if(response.Analgesia){
                          vm.Analgesia = "Si";
                          vm.data.Analgesia = response.Analgesia;
                          vm.data.Analgesia.c1s10c = new Date(1970,0,1,23,0,0);
                        }
                        if(response.Anestesia){
                          vm.Anestesia = "Si";
                          vm.data.Anestesia = response.Anestesia;
                        }

                        vm.data.Note = response.Note || null;
                        vm.data.Risk = vm.data.Risk || [];
                        vm.data.Consulence = vm.data.Consulence || [];
                        vm.data.Team = vm.data.Team || [];
                        vm.data.Therapy = vm.data.Therapy || [];
                        vm.data.patientId = response.Patient.id;
                        OptionService.Get('info').then(function(response){
                          vm.items = response;
                        });
                      });
                      else{
                        if(loadItems == 5) //Load patient with id
                          UserService.GetByUsername(vm.user.username).then(function (response) {
                            vm.data = response;
                          });
                        else{
                          if(loadItems == 6) //Load study with id
                            StudyService.GetByPatient(id).then(function (response) {
                              vm.showSidebar = true;
                              vm.data = response;
                              vm.data['id'] = id;
                            });
                        }
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
              vm.data.id = response.id;
              vm.data.password = null;
              vm.data.ClinicId = null;
              vm.data.GroupId = null;
              vm.users.push(vm.data);
              cleanForm();
            });
          else{
            if(!vm.data.password || vm.data.password.length == 0) delete vm.data.password;
            console.log(vm.data);
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

        function submitStudy(){
          StudyService.Create(vm.data).then(function(response){
            vm.studies.push(vm.data);
            cleanForm();
          });
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
              var line = angular.element(document.querySelector("#doctor"+vm.data.id));
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
          if(vm.data.Risk.length == 0) delete vm.data.Risk;
          if(vm.data.Consulence.length == 0) delete vm.data.Consulence;
          if(vm.data.Team.length == 0) delete vm.data.Team;
          if(vm.data.Therapy.length == 0) delete vm.data.Therapy;

          if(vm.data.Summary) submitInfoSummary();
          if(vm.data.Risk) submitInfoRisk();
          if(vm.data.Consulence) submitInfoConsulence();
          if(vm.data.Analgesia) submitInfoAnalgesia();
          if(vm.data.Team) submitInfoTeam();
          if(vm.data.Therapy) submitInfoTherapy();
          if(vm.data.Anestesia) submitInfoAnestesia();
          if(vm.data.Note) submitInfoNote();

          vm.data.Risk = vm.data.Risk || [];
          vm.data.Consulence = vm.data.Consulence || [];
          vm.data.Team = vm.data.Team || [];
          vm.data.Therapy = vm.data.Therapy || [];
        }
        function submitInfoRisk(){
          angular.forEach(vm.data.Risk, function(value, key) {
            vm.data.Risk[key].PatientId = vm.data.patientId;
          });
          PatientService.SaveTInfo(vm.data.Risk,vm.data.patientId,'risk').then(function(response){
            vm.data.Risk = response;
            timer(true);
          });
        }
        function submitInfoConsulence(){
          angular.forEach(vm.data.Consulence, function(value, key) {
            vm.data.Consulence[key].PatientId = vm.data.patientId;
          });
          PatientService.SaveTInfo(vm.data.Consulence,vm.data.patientId,'consulence').then(function(response){
            vm.data.Consulence = response;
            timer(true);

          });
        }
        function submitInfoTeam(){
          angular.forEach(vm.data.Team, function(value, key) {
            vm.data.Team[key].PatientId = vm.data.patientId;
          });
          PatientService.SaveTInfo(vm.data.Team,vm.data.patientId,'team').then(function(response){
            vm.data.Team = response;
            timer(true);
          });
        }
        function submitInfoTherapy(){
          angular.forEach(vm.data.Therapy, function(value, key) {
            vm.data.Therapy[key].PatientId = vm.data.patientId;
          });
          PatientService.SaveTInfo(vm.data.Therapy,vm.data.patientId,'therapy').then(function(response){
            vm.data.Risk = response;
            timer(true);
          });
        }
        function submitInfoSummary(){
          vm.data.Summary.PatientId = vm.data.patientId;
          if(!vm.data.Summary.id)
            PatientService.CreateInfo(vm.data.Summary,'summary').then(function(response){
              vm.data.Summary = response;
              timer(true);
            });
          else
            PatientService.UpdateInfo(vm.data.Summary,'summary').then(function(response){
              vm.data.Summary = response;
              timer(true);
            });
        }
        function submitInfoAnalgesia(){
          vm.data.Analgesia.PatientId = vm.data.patientId;
          if(!vm.data.Analgesia.id)
            PatientService.CreateInfo(vm.data.Analgesia,'analgesia').then(function(response){
              vm.data.Analgesia = response;
              timer(true);
            });
          else
            PatientService.UpdateInfo(vm.data.Analgesia,'analgesia').then(function(response){
              vm.data.Summary = response;
              timer(true);
            });
        }
        function submitInfoAnestesia(){
          vm.data.Anestesia.PatientId = vm.data.patientId;
          if(!vm.data.Anestesia.id)
            PatientService.CreateInfo(vm.data.Anestesia,'anestesia').then(function(response){
              vm.data.Anestesia = response;
              timer(true);
            });
          else
            PatientService.UpdateInfo(vm.data.Anestesia,'anestesia').then(function(response){
              vm.data.Anestesia = response;
            });
        }
        function submitInfoNote(){
          vm.data.Note.PatientId = vm.data.patientId;
          if(!vm.data.Note.id)
            PatientService.CreateInfo(vm.data.Note,'note').then(function(response){
              vm.data.Note = response;
              timer(true);
            });
          else
            PatientService.UpdateInfo(vm.data.Note,'note').then(function(response){
              vm.data.Note = response;
              timer(true);
            });
        }

        function cleanSummaryC2s3(){
          if(vm.data.Summary)
            if(vm.data.Summary.c2s2 == "Si"){
              vm.data.Summary.c2s3a = false;
              vm.data.Summary.c2s3b = false;
              vm.data.Summary.c2s3c = false;
              vm.data.Summary.c2s4 = "";
              vm.data.Summary.c2s5 = "";
            }

        }

        function cleanAnalgesiaC1s1(){
          if(vm.Analgesia == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questa pagina")){
              vm.data.Analgesia = null;
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
          if(vm.Anestesia == 'No')
            if(confirm("Se confermi verranno cancellati i dati inseriti in questa pagina")){
              vm.data.Anestesia = null;
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
          if(!vm.loadedTherapy)
            vm.data.Therapy.push(vm.therapy);
          else
            angular.forEach(vm.data.Therapy, function(value, key) {
              if(vm.data.Therapy[key].$$hashKey == vm.therapy.$$hashKey)
                vm.data.Therapy[key] = vm.therapy;
            });

          vm.therapy = {};
          vm.showModal = !vm.showModal;
          vm.loadedTherapy = false;
        }
        function loadTherapy(id){
          vm.therapy = vm.data.Therapy[id];
          vm.showModal = !vm.showModal;
          vm.loadedTherapy = true;
        }
        function closeTherapy(){
          vm.therapy = {};
          vm.showModal = !vm.showModal;

        }

        function deleteFromArray(table,index){
          if(!vm.data[table][index].id)
            vm.data[table].splice(index,1);
          else {
            PatientService.DeleteTInfo('/info/'+table+"/"+vm.data[table][index].id).then(function(response){
              vm.data[table].splice(index,1);
              timer(true);
            });
          }
        }

        function timer(successAlert){
          vm.success = successAlert;
          vm.error = !successAlert;
          $timeout(function () {
            vm.success = false;
            vm.error = false;

          }, 3000);
        }
        // TEMPLATE
    }

})();
