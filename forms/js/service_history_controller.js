function ServiceHistoryController($log, $state){//, conditionInfo){
    var model = this;
    $log.debug("ServiceHistoryController::Begin");

    model.contactType = $state.params.contactType;

    model.branches = [{id:123, name:"Navy"}, {id:234, name:'Army'}];
    model.rankTypes = [{id:345, name:"Officer"}, {id:456, name:"Enlisted"}];
    model.ranks = [{id:567, name:"Admiral", rankType:345}, {id:678, name:"Private", rankType:456}];

    model.goTo = function() {
        $state.transitionTo('applications.serviceAwards', {contactType: model.contactType});
    };

    $log.debug("ServiceHistoryController::End");
}
angular.module('hf').controller('ServiceHistoryController', ServiceHistoryController);
