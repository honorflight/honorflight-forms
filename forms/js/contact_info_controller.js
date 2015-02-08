function ContactInfoController($log, $state, wars){
    var model = this;
    $log.debug("ContactInfoController::Begin");

    model.wars = wars;

    model.promises = [wars];

    // model.goTo = function() {
    //   contact.submit().then(function(){
    //     $state.transitionTo('applications.serviceHistory', $state.params);
    //   });
    // };

    $log.debug("ContactInfoController::End");
}
angular.module('hf').controller('ContactInfoController', ContactInfoController);
