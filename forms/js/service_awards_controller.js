function ServiceAwardsController($log, $state, serviceAwards){//, conditionInfo){
    var model = this;
    $log.debug("ServiceAwardsController::Begin");

    model.awards = serviceAwards;

    model.goTo = function() {
      $state.transitionTo('applications.medicalCondition', $state.params);
    };

    $log.debug("ServiceAwardsController::End");
}
angular.module('hf').controller('ServiceAwardsController', ServiceAwardsController);

