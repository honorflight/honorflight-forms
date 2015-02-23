function ContactController($log, $state, $scope, person, serviceHistory) {
    $log.debug("ContactController::Begin");
    var model = this;
    var conditionCount = 0;
    var awardCount = 0;

    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    // regular
    //model.person = {};


    // debugging right now
    // http://localhost:9001/#/applications/serviceHistory?contactType=veteran
    // stub person
    var person_attributes = {
      "first_name":"Jeff",
      "last_name":"Ancel",
      "email":"jancel@gmail.com",
      "birth_date":"20-03-1979"
    };

    if (!angular.isDefined(model.person)){
        person.save(person_attributes, function(response){
            model.person = response;
        });
    }

    model.submitContactInfo = function(transitionTo){
        $log.debug("if Contact ID is null, create: " + JSON.stringify(model));
        if (angular.isDefined(model.person.id) && model.person.id !== null){
            $log.debug("Update contact");
            person.update(model.person, {id: model.person.id});
        } else {
            $log.debug("Create contact");
            person.save(model.person, function(response){
                model.person.id = response.id;
                model.person.uuid = response.uuid;
            });
        }

        $state.transitionTo(transitionTo, $state.params);
    };

    model.submitServiceHistory = function(transitionTo){
        $log.debug("if service history blank, create; otherwise, update: %s", JSON.stringify(model.person.serviceHistory));
        if (angular.isDefined(model.person.serviceHistory)) {
          if (angular.isDefined(model.person.serviceHistory.id)){
            // update
            serviceHistory.update({id: model.person.serviceHistory.id}, model.person.serviceHistory);
          } else {
            // create
            serviceHistory.save({person_id: model.person.id}, model.person.serviceHistory, function(response){
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

    function Award(name, quantity, comment) {
        this.awardName = name;
        this.awardQuantity = quantity;
        this.awardComment = comment;
        this.awardId = awardCount;
    }

    model.addAward = function() {
        model.serviceAwards.push(new Award(model.awardName.name, model.awardQuantity, model.awardComment));
        model.awardName = model.awardQuantity = model.awardComment = "";
        awardCount++;
    };

    model.deleteAward = function(award) {
        for(var i=0; i<model.serviceAwards.length; i++) {
            if(model.serviceAwards[i].awardId === award.awardId) {
                model.serviceAwards.splice(i, 1);
                break;
            }
        }
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
    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
