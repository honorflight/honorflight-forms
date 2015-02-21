function MedicalConditionController($log, $state, medicalConditionTypes, medicalConditionNames){//, conditionInfo){
    var model = this;
    $log.debug("MedicalConditionController::Begin");

    // model.conditionInfo = conditionInfo;
    // model.contactType = $state.params.contactType;

    model.promises = [medicalConditionTypes, medicalConditionNames];

    model.medicalConditionTypes = medicalConditionTypes;
    model.medicalConditionNames = medicalConditionNames;

    model.goTo = function() {
        // $state.transitionTo('applications.serviceHistory', {contactType: model.contactType});
    };

    $log.debug("MedicalConditionController::End");
}
angular.module('hf').controller('MedicalConditionController', MedicalConditionController);
