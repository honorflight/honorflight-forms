function ContactController($log, $state, $scope, Person, ServiceHistory) {
    $log.debug("ContactController::Begin");
    var model = this;
    var conditionCount = 0;

    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    model.person = new Person();

    model.submitContactInfo = function(transitionTo){
        model.person.save().then(function(response){
            $log.debug("Success: %s", response);
            $state.transitionTo(transitionTo, $state.params);
        },function(response){
            $log.debug("E-rror: %s", response);            
        });
    };

    model.submitServiceHistory = function(transitionTo){
        $log.debug("if service history blank, create; otherwise, update: %s", JSON.stringify(model.person.serviceHistory));
        if (angular.isDefined(model.person.serviceHistory)) {
          if (angular.isDefined(model.person.serviceHistory.id)){
            // update
            ServiceHistory.update({id: model.person.serviceHistory.id}, model.person.serviceHistory);
          } else {
            // create
            ServiceHistory.save({person_id: model.person.id}, model.person.serviceHistory, function(response){
              model.person.serviceHistory.id = response.id;
            });            
          }
        } 

        // $log.debug("serviceHistory is: %s", JSON.stringify(model.person.serviceHistory));
        $state.transitionTo(transitionTo, $state.params);
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
        model.medicalConditions.push(new MedicalCondition(model.conditionType.name, model.conditionName.name, formatDate(model.conditionDate), model.conditionComment));
        model.conditionType = model.conditionName = model.conditionDate = model.conditionComment = "";
        conditionCount++;
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

    model.addAward = function() {
        model.person.serviceHistory.service_awards_attributes.push({award_id: model.awardName.id, quantity: model.awardQuantity, comment: model.awardComment});
        model.awardName = model.awardQuantity = model.awardComment = "";
    };

    model.deleteAward = function(award) {
        
    };

    function formatDate(date) {
        return date.substring(0,2) + "/" + date.substring(2);
    }

    model.goTo = function(contactType){
      $state.transitionTo('applications.contactInfo', {contactType: contactType});
    };

    $log.debug("Contact type is: " + model.contactType);

    // Not real functional, but leaving it as an example
    $scope.$watch(angular.bind(this, function(){
        return model.rankType;
    }), function(n,o){
        $log.debug("is there: " + !(angular.isDefined(n) && angular.isDefined(n.id)));
        if (angular.isDefined(n)){
            $log.debug("Contact rankType changed to: " + JSON.stringify(n));
        }
    });

    // Date's will need this watcher
    // $scope.$watch(angular.bind(this, function(){
    //     return model.person.birthDate;
    // }), function(n,o){
    //     if (angular.isDefined(n) && typeof n === "string"){
    //         var parts = n.split('-');
    //         model.person.birthDate = new Date(parts[0], parts[1]-1, parts[2]);
    //     }
    // });
    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
