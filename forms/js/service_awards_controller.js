function ServiceAwardsController($log, $state){//, conditionInfo){
    var model = this;
    $log.debug("ServiceAwardsController::Begin");

    model.contactType = $state.params.contactType;
    model.awards = [{id:123, name:"Purple Heart"}, {id:234, name:"Bronze Star"}, {id:345, name:"Medal of Honor"}];

    model.goTo = function() {
        //$state.transitionTo('applications.serviceHistory', {contactType: model.contactType});
    };

    $log.debug("ServiceAwardsController::End");
}
angular.module('hf').controller('ServiceAwardsController', ServiceAwardsController);

