function ContactController($log, $state, $scope, $filter, Person, AlternateContact, ServiceHistory, ServiceAward) {
    $log.debug("ContactController::Begin");
    var model = this;
    var conditionCount = 0;
    model.promises = [];
    model.applicationTypes = ['Veteran', 'Guardian', 'Volunteer'];

    model.contactType = $state.params.contactType || 'veteran';

    model.person = new Person();
    model.person.type = model.contactType;
    model.person.alternateContact = new AlternateContact();
    model.person.serviceHistory = new ServiceHistory();

    model.contactSteps = {
      'veteran': {
        'contactInfo':{'back': null, 'forward': 'applications.alternateContact'},
        'alternateContact':{'back': 'applications.contactInfo', 'forward': 'applications.serviceHistory'},
        'serviceHistory':{'back': 'applications.alternateContact', 'forward': 'applications.medicalConditions'},
        'medicalConditions':{'back': 'applications.serviceHistory', 'forward': 'applications.thanks'},
        'thanks': {'back': 'applications.medicalConditions', 'forward': null}
      },
      'guardian': {
        'contactInfo': {'back': null, 'forward': 'applications.alternateContact'},
        'alternateContact': {'back': 'applications.contactInfo', 'forward': 'applications.serviceHistory'},
        'serviceHistory': {'back': 'applications.alternateContact', 'forward': 'applications.volunteerInfo'},
        'volunteerInfo': {'back': 'applications.serviceHistory', 'forward': 'applications.thanksVolunteers'},
        'thanksVolunteers': {'back': 'applications.volunteerInfo', 'forward': null}
      },
      'volunteer': {
        'contactInfo': {'back': null, 'forward': 'applications.serviceHistory'},
        'serviceHistory': {'back': 'applications.contactInfo', 'forward': 'applications.volunteerInfo'},
        'volunteerInfo': {'back': 'applications.serviceHistory', 'forward': 'applications.thanksVolunteers'},
        'thanksVolunteers': {'back': 'applications.volunteerInfo', 'forward': null}
      }
    };


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
        model.person.save();
        $state.transitionTo(transitionTo, $state.params);
      }
    };

    model.submitServiceHistory = function(transitionTo){
      var successFunction = function(success){
        $log.debug("Success");
        model.person.serviceHistory.id = success.id;
        // here we also need to get the serviceAwards and persist their id's
        // then we can delete them if the trash can is hit
        if (angular.isDefined(model.person.serviceHistory.serviceAwards) && model.person.serviceHistory.serviceAwards !== null && model.person.serviceHistory.serviceAwards.length !== 0){
          var promise = model.person.serviceHistory.getServiceAwards();
          model.promises = [promise];
          promise.then(function(awards){
            model.person.serviceHistory.serviceAwards = awards;
          });
        }

        model.promises = [];
        $state.transitionTo(transitionTo, $state.params);
      };

      var errorFunction = function(error){
        $log.debug("Failure");
        model.promises = [];
      };

      if ((angular.isDefined(model.awardQuantity) && model.awardQuantity !== "") ||
        (angular.isDefined(model.awardName) && model.awardName !== "") ||
        (angular.isDefined(model.awardComment) && model.awardComment !== "")){
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

      model.person.medicalConditions = model.person.medicalConditions || [];
      model.person.saveMedicalCondition(model.medicalCondition).then(function(success){
        $log.debug("Success");
        model.person.medicalConditions.push(success);
      });
      // model.person.medicalConditions.push(angular.copy(model.medicalCondition));
      model.medicalCondition = {};
    };

    model.deleteMedicalCondition = function(medicalCondition, index) {
      medicalCondition.delete().then(function(){
        model.person.medicalConditions.splice(index, 1);
      });

    };

    model.submitMedicalConditions = function(transitionTo){
      if (!angular.equals(model.medicalCondition, {})){
        model.addMedicalCondition();
      }
      $state.transitionTo(transitionTo, $state.params);
    };
    /* Medical Condition */


    model.submitVolunteerExperience = function(transitionTo){
      model.person.save();
      $state.transitionTo(transitionTo, $state.params);
    };


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
