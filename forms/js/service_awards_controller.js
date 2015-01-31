function ServiceAwardsController($log, $state, serviceAwards){//, conditionInfo){
    var model = this;
    $log.debug("ServiceAwardsController::Begin");

    model.contactType = $state.params.contactType;
    model.awards = serviceAwards;

    model.goTo = function() {
        //$state.transitionTo('applications.serviceHistory', {contactType: model.contactType});
    };

    $log.debug("ServiceAwardsController::End");
}
angular.module('hf').controller('ServiceAwardsController', ServiceAwardsController);

