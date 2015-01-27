function MedicalConditionController($log, $state){//, conditionInfo){
    var model = this;
    $log.debug("MedicalConditionController::Begin");

    //model.conditionInfo = conditionInfo;
    model.contactType = $state.params.contactType;

    model.types = [{id:123, name:"Heart Problems"}, {id:456, name:"Diabetes"}];
    model.conditionNames = [{id:789, name:"Pace Maker", conditionType:123}, {id:987, name:"Blood Thinners", conditionType:123},
        {id:654, name:"Insulin", conditionType:456}];

    model.goTo = function() {
        $state.transitionTo('applications.serviceHistory', {contactType: model.contactType});
    };

    $log.debug("MedicalConditionController::End");
}
angular.module('hf').controller('MedicalConditionController', MedicalConditionController);
