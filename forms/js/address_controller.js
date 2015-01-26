function AddressController($log, $state){
    var model = this;
    $log.debug("AddressController::Begin");

    model.contactType = $state.params.contactType;

    model.goTo = function() {
        $state.transitionTo('applications.medicalCondition', {contactType: model.contactType});
    };

    $log.debug("AddressController::End");
}
angular.module('hf').controller('AddressController', AddressController);
