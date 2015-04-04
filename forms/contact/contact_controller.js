function ContactController($log, $state, $scope, $filter, Person, AlternateContact, ServiceHistory, ServiceAward) {
    $log.debug("ContactController::Begin");
    var model = this;
    var conditionCount = 0;
    model.promises = [];
    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    model.person = new Person();
    model.person.alternateContact = new AlternateContact();
    model.person.serviceHistory = new ServiceHistory();
    // MOCK IT (toggle above and below to fake a person)
    // model.person = new Person({firstName: "Jeff", lastName: "Ancel", phone: "314-703-8829", email: "jancel@gmail.com", birth_date: "03/20/1979"}).save().then(function(response){
    //   model.person = response;
    //   model.person.serviceHistory = {};
    // });


    model.submitContactInfo = function(form, transitionTo){
        if(form.$valid) {
          var promise = model.person.save();
          model.promises = [promise];
          promise.then(function (response) {
            model.promises = [];
            $state.transitionTo(transitionTo, $state.params);
          }, function (response) {
              // Do nothing
          });
        }
    };

    model.submitAlternateContact = function(form, transitionTo){
      if (form.$valid){
        $log.debug("Submitting and then moving on");
        var promise = null;
        if (angular.isDefined(model.person.alternateContact.id)){
          promise = model.person.alternateContact.save();
          model.promises = [promise];
          promise.then(function(){
            model.promises = [];
          });
        } else {
          promise = model.person.saveAlternateContact(model.person.alternateContact);
          model.promises = [promise];
          promise.then(function(data){
            model.person.alternateContact.id = data.id;
            model.promises = [];
          });
        }
        $state.transitionTo(transitionTo, $state.params);
      }
    };

    model.submitServiceHistory = function(transitionTo){
      var successFunction = function(success){
        $log.debug("Success");
        model.person.serviceHistory.id = success.id;
        // here we also need to get the serviceAwards and persist their id's
        // then we can delete them if the trash can is hit
        if (angular.isDefined(model.person.serviceHistory.serviceAwards) && model.person.serviceHistory.serviceAwards.length !== 0){
          var promise = model.person.serviceHistory.getServiceAwards();
          model.promises = [promise];
          promise.then(function(awards){
            model.person.serviceHistory.serviceAwards = awards;
            model.promises = [];
          });
        }

        $state.transitionTo(transitionTo, $state.params);
      };

      var errorFunction = function(error){
        $log.debug("Failure");
        model.promises = [];
      };

      if (model.awardQuantity !== "" || model.awardName !== "" || model.awardComment !== "") {
        model.addAward();
      }

      if (angular.isDefined(model.person.serviceHistory) && !angular.equals(new ServiceHistory(), model.person.serviceHistory)) {
        var promise = null;
        if (angular.isDefined(model.person.serviceHistory.id)){
          promise = model.person.serviceHistory.save();
          model.promises = [promise];
          promise.then(successFunction, errorFunction);
        } else {
          model.person.serviceHistory = new ServiceHistory(model.person.serviceHistory);
          promise = model.person.saveServiceHistory(model.person.serviceHistory);
          model.promises = [promise];
          promise.then(successFunction, errorFunction);
        }
      } else {
        $state.transitionTo(transitionTo, $state.params);
      }
    };

    model.serviceAwards = [];

    model.showAwards = function(){
      return angular.isDefined(model.person.serviceHistory);
    };

    model.addAward = function() {
      // initialize
        var quantity = parseInt(model.awardQuantity, 10);
        if(quantity < 1 || quantity > 100) {
            model.serviceAwardError = true;
        } else {
            model.serviceAwardError = false;
            model.person.serviceHistory.serviceAwards = model.person.serviceHistory.serviceAwards || [];

            var serviceAward = null;
            if (angular.isUndefined(model.awardName)){
              serviceAward = new ServiceAward({
                quantity: model.awardQuantity || 1,
                comment: model.awardComment
              });
            } else {
              serviceAward = new ServiceAward({
                awardId: model.awardName.id,
                quantity: model.awardQuantity || 1,
                comment: model.awardComment
              });
            }

            model.person.serviceHistory.serviceAwards.push(serviceAward);
            model.awardName = model.awardQuantity = model.awardComment = "";
        }
    };

    model.deleteAward = function(award, index) {
      // add custom logic to remove award if there is an id associated
      if (angular.isDefined(award) && angular.isDefined(award.id)){
        // delete through apu
        award.delete();
      }

      // splice from index
      model.person.serviceHistory.serviceAwards.splice(index, 1);
    };


    model.hasRankType = function(){
        return !(angular.isDefined(model.rankType));
    };

    /* Medical Condition */
    model.medicalCondition = {};
    model.addMedicalCondition = function() {
      $log.debug("Adding medicalCondition");
      if (!angular.isDefined(model.person.medicalConditions)){
        model.person.medicalConditions = [];
      }
      model.person.saveMedicalCondition(model.medicalCondition).then(function(success){
        $log.debug("Success");
        model.person.getMedicalConditions().then(function(data){
          model.person.medicalConditions = data;
        });
      });
      // model.person.medicalConditions.push(angular.copy(model.medicalCondition));
      model.medicalCondition = {};
    };

    model.deleteMedicalCondition = function(medicalCondition, index) {
      medicalCondition.delete().then(function(){
        model.person.getMedicalConditions().then(function(data){
          model.person.medicalConditions = data;
        });
      });

    };

    model.submitMedicalConditions = function(transitionTo){
      if (!angular.equals(model.medicalCondition, {})){
        model.addMedicalCondition();
      }
      $state.transitionTo(transitionTo, $state.params);
    };
    /* Medical Condition */



    /* debugging */
    // $filter('rankFilter')(array,function(){
    //   $log.debug("Hello");
    // },function(){
    //   log.debug("World");
    // });


    model.goTo = function(contactType){
      $state.transitionTo('applications.contactInfo', {contactType: contactType});
    };

    model.goBack = function(transitionTo) {
        $state.transitionTo(transitionTo, $state.params);
    };

    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
