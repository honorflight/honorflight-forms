function ServiceHistoryController($log, $state, serviceBranches, serviceRankTypes){//, conditionInfo){
    var model = this;
    $log.debug("ServiceHistoryController::Begin");

    model.contactType = $state.params.contactType;

    model.branches = serviceBranches;
    model.rankTypes = serviceRankTypes;
    model.ranks = [{id:567, name:"Admiral", rankTypeId:345}, {id:678, name:"Private", rankTypeId:456}];

    model.goTo = function() {
        $state.transitionTo('applications.serviceAwards', {contactType: model.contactType});
    };

    $log.debug("ServiceHistoryController::End");
}
angular.module('hf').controller('ServiceHistoryController', ServiceHistoryController);
