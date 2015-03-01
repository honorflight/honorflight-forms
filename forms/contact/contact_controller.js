function ContactController($log, $state, $scope, $filter, Person, ServiceHistory) {
    $log.debug("ContactController::Begin");
    var model = this;
    var conditionCount = 0;

    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    // model.person = new Person();
    // model.person.serviceHistory = new ServiceHistory();
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
      $log.debug("save this service history: %s", JSON.stringify(model.person.serviceHistory));

      var successFunction = function(success){
        $log.debug("Success");
        model.person.serviceHistory.id = success.id;
        // here we also need to get the serviceAwards and persist their id's
        // then we can delete them if the trash can is hit
        $state.transitionTo(transitionTo, $state.params);
      };
 
      var errorFunction = function(error){
        $log.debug("Failure");
      };

      if (angular.isDefined(model.person.serviceHistory.id)) {
        // update
        ServiceHistory.update({ id: model.person.serviceHistory.id}, model.person.serviceHistory, successFunction, errorFunction);
      } else {
        // create
        ServiceHistory.save({person_id: model.person.id}, model.person.serviceHistory, successFunction, errorFunction);
      }
      

        // model.person.serviceHistory.save().then(function(response){
        //     $log.debug("Success: %s", response);
        //     // $state.transitionTo(transitionTo, $state.params);
        // },function(response){
        //     $log.debug("Error: %s", response);            
        // });
        // if (angular.isDefined(model.person.serviceHistory)) {
        //   if (angular.isDefined(model.person.serviceHistory.id)){
        //     // update
        //     ServiceHistory.update({id: model.person.serviceHistory.id}, model.person.serviceHistory);
        //   } else {
        //     // create
        //     ServiceHistory.save({person_id: model.person.id}, model.person.serviceHistory, function(response){
        //       model.person.serviceHistory.id = response.id;
        //     });            
        //   }
        // } 

        // $log.debug("serviceHistory is: %s", JSON.stringify(model.person.serviceHistory));
        // $state.transitionTo(transitionTo, $state.params);
    };

    model.hasRankType = function(){
        return !(angular.isDefined(model.rankType));
    };

    function MedicalCondition(type, name, date, comment){
        this.conditionType = type;
        this.conditionName = name;
        this.conditionDate = date;
        this.conditionComment = comment;
        this.conditionId = conditionCount;
    }

    model.medicalConditions = [];

    model.addCondition = function() {
        // model.medicalConditions.push(new MedicalCondition(model.conditionType.name, model.conditionName.name, formatDate(model.conditionDate), model.conditionComment));
        // model.conditionType = model.conditionName = model.conditionDate = model.conditionComment = "";
        // conditionCount++;
    };

    model.deleteCondition = function(condition) {
        for(var i=0; i<model.medicalConditions.length; i++) {
            if(model.medicalConditions[i].conditionId === condition.conditionId) {
                model.medicalConditions.splice(i, 1);
                break;
            }
        }
    };

    model.canAddToList = function(listType) {
        return model[listType].length >= 5;
    };

    model.serviceAwards = [];

    model.showAwards = function(){
      return angular.isDefined(model.person.serviceHistory);
    };

    model.addAward = function() {
      // initialize
      model.person.serviceHistory.service_awards_attributes = model.person.serviceHistory.service_awards_attributes || [];

      model.person.serviceHistory.service_awards_attributes.push({award_id: model.awardName.id, quantity: model.awardQuantity || 1, comment: model.awardComment});
      model.awardName = model.awardQuantity = model.awardComment = "";
    };

    model.deleteAward = function(award) {
      // add custom logic to remove award if there is an id associated
    };


    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
