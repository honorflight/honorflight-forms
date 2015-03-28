function AlternateContactController($log, $state, $modal, contactRelationships){
    var model = this;
    $log.debug("AlternateContactController::Begin");

    model.contactRelationships = contactRelationships;
    model.promises = [contactRelationships];
    
    $log.debug("AlternateContactController::End");
}
angular.module('hf').controller('AlternateContactController', AlternateContactController);
