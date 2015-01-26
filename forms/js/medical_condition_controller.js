function MedicalConditionController($log, $state){//, conditionInfo){
    var model = this;
    $log.debug("MedicalConditionController::Begin");

    //model.conditionInfo = conditionInfo;
    model.contactType = $state.params.contactType;

    model.goTo = function() {
        //$state.transitionTo('applications.address', {contactType: model.contactType});
    };

    $log.debug("MedicalConditionController::End");
}
angular.module('hf').controller('MedicalConditionController', MedicalConditionController);
