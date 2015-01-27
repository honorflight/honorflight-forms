function ContactController($log, $state, person) {
    $log.debug("ContactController::Begin");
    var model = this;

    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    model.submit = function(){
        $log.debug("if Contact ID is null, create");
        $log.debug(person.hello());
        $log.debug("if Contact ID is not null, update");
    };


    function MedicalCondition(type, name, date, comment){
        this.conditionType = type;
        this.conditionName = name;
        this.conditionDate = date;
        this.conditionComment = comment;
    }

    model.medicalConditions = [];

    model.addCondition = function() {
        model.medicalConditions.push(new MedicalCondition(model.conditionType, model.conditionName, model.conditionDate, model.conditionComment));
        model.conditionType = model.conditionName = model.conditionDate = model.conditionComment = "";
    };

    model.canAddToList = function(listType) {
        return model[listType].length >= 5;
    };

    function Award() {
        this.name = "";
        this.quantity = "";
        this.comment = "";
    }

    model.serviceAwards = [new Award()];

    model.addAward = function() {
        model.serviceAwards.push(new Award());
    };

    model.goTo = function(contactType){
      $state.transitionTo('applications.contactInfo', {contactType: contactType});
    };

    $log.debug("Contact type is: " + model.contactType);
    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
