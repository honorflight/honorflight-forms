function ContactController($log, $state, $scope, $filter, Person, ServiceHistory, ServiceAward) {
    $log.debug("ContactController::Begin");
    var model = this;
    var conditionCount = 0;

    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    //model.person = new Person();
    //model.person.serviceHistory = new ServiceHistory();
    model.person = new Person({firstName: "Jeff", lastName: "Ancel", email: "jancel@gmail.com", birth_date: "20-03-1979"}).save().then(function(response){
      model.person = response;
      model.person.serviceHistory = {};
    });

    model.submitContactInfo = function(transitionTo){
        model.person.save().then(function(response){
            $log.debug("Success: %s", response);
            $state.transitionTo(transitionTo, $state.params);
        },function(response){
            $log.debug("Error: %s", response);
        });
    };

    model.submitServiceHistory = function(transitionTo){
      var successFunction = function(success){
        $log.debug("Success");
        model.person.serviceHistory.id = success.id;
        // here we also need to get the serviceAwards and persist their id's
        // then we can delete them if the trash can is hit
        if (angular.isDefined(model.person.serviceHistory.serviceAwards) && model.person.serviceHistory.serviceAwards.length !== 0){
          model.person.serviceHistory.getServiceAwards().then(function(awards){
            model.person.serviceHistory.serviceAwards = awards;
          });
        }

        $state.transitionTo(transitionTo, $state.params);
      };

      var errorFunction = function(error){
        $log.debug("Failure");
      };

      if (angular.isDefined(model.person.serviceHistory) && !angular.equals(new ServiceHistory(), model.person.serviceHistory)) {
        if (angular.isDefined(model.person.serviceHistory.id)){
          model.person.serviceHistory.save().then(successFunction, errorFunction);
        } else {
          model.person.serviceHistory = new ServiceHistory(model.person.serviceHistory);
          model.person.saveServiceHistory(model.person.serviceHistory).then(successFunction, errorFunction);
        }
      } else {
        $state.transitionTo(transitionTo, $state.params);
      }
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
      model.person.medicalConditions.push(angular.copy(model.medicalCondition));
      model.medicalCondition = {};
    };

    model.deleteMedicalCondition = function(idx) {

    };
    /* Medical Condition */



    model.serviceAwards = [];

    model.showAwards = function(){
      return angular.isDefined(model.person.serviceHistory);
    };

    model.addAward = function() {
      // initialize
      model.person.serviceHistory.serviceAwards = model.person.serviceHistory.serviceAwards || [];

      model.person.serviceHistory.serviceAwards.push({awardId: model.awardName.id, quantity: model.awardQuantity || 1, comment: model.awardComment});
      model.awardName = model.awardQuantity = model.awardComment = "";
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

    model.goTo = function(contactType){
      $state.transitionTo('applications.contactInfo', {contactType: contactType});
    };
    
    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
