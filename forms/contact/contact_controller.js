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


    function MedicalCondition(){
        this.conditionType = "";
        this.conditionName = "";
        this.conditionDate = "";
        this.comment = "";
    }

    model.medicalConditions = [new MedicalCondition()];

    model.addCondition = function() {
        model.medicalConditions.push(new MedicalCondition());
    };

    model.canAddCondition = function() {
        return model.medicalConditions.length >= 5;
    };

    model.goTo = function(contactType){
      $state.transitionTo('applications.contactInfo', {contactType: contactType});
    };

    $log.debug("Contact type is: " + model.contactType);
    $log.debug("ContactController::End");
}
angular.module('hf').controller('ContactController', ContactController);
