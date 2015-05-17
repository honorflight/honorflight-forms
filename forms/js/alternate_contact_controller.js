function AlternateContactController($log, $state, $modal, contactRelationships){
    var model = this;
    $log.debug("AlternateContactController::Begin");

    model.contactRelationships = contactRelationships;
    model.promises = [contactRelationships];

    model.specialRequestText = {
      "veteran": "Please let us know if there is any special requests. Typically, this may be veteran \"War Buddies\" that you would like on the same flight or a specific flight guardian.  You can also tell us other pertinent information you feel we need to know.",
      "guardian": "Please tell us if you have any additional needs or requests.  For example, if you would like to fly with a specific veteran then please tell us their name."
    };
    
    $log.debug("AlternateContactController::End");
}
angular.module('hf').controller('AlternateContactController', AlternateContactController);
