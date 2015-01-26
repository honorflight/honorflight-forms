function ContactInfoController($log, $state, wars){
    var model = this;
    $log.debug("ContactInfoController::Begin");

    model.wars = wars;
    model.contactType = $state.params.contactType;

    model.goTo = function() {
        $state.transitionTo('applications.address', {contactType: model.contactType});
    };

    $log.debug("ContactInfoController::End");
}
angular.module('hf').controller('ContactInfoController', ContactInfoController);
