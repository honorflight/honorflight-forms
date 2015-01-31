function ServiceHistoryController($log, $state, $scope, serviceBranches, serviceRankTypes, serviceRanks){
    var model = this;
    $log.debug("ServiceHistoryController::Begin");

    model.contactType = $state.params.contactType;

    model.promises = [serviceBranches.$promise, serviceRankTypes.$promise, serviceRanks.$promise];

    model.branches = serviceBranches; // [] || {}
    model.rankTypes = serviceRankTypes;
    model.ranks = serviceRanks;

    model.goTo = function() {
        $state.transitionTo('applications.serviceAwards', {contactType: model.contactType});
    };

    $log.debug("ServiceHistoryController::End");
}
angular.module('hf').controller('ServiceHistoryController', ServiceHistoryController);
