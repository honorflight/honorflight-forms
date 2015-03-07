function MedicalConditionController($log, $state, medicalConditionTypes, medicalConditionNames){//, conditionInfo){
    var model = this;
    $log.debug("MedicalConditionController::Begin");

    model.promises = [medicalConditionTypes, medicalConditionNames];

    model.medicalConditionTypes = medicalConditionTypes;
    model.medicalConditionNames = medicalConditionNames;

    model.accordianSetting = {
      isFirstOpen: true,
      isFirstDisabled: false,
      oneAtATime: true,
    };

    model.nameFor = function(type, id){
      var returning = {name: "undefined"};
      angular.forEach(model[type], function(m){
        if (m.id === id){
          returning = m;
        }
      });
      return returning;
    };

    $log.debug("MedicalConditionController::End");
}
angular.module('hf').controller('MedicalConditionController', MedicalConditionController);
