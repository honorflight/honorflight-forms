function ContactController($log, $state, person) {
    $log.debug("ContactController::Begin");
    var model = this;

    model.applicationTypes = ['veteran', 'guardian', 'volunteer'];
    model.contactType = $state.params.contactType;

    model.submit = function(){
        $log.debug("if Contact ID is null, create");
        $log.debug(person.hello());
        $log.debug("if Contact ID is not null, update");
    };

    model.goTo = function(contactType){
      $state.transitionTo('applications.contactInfo', {contactType: contactType});
    };

    model.wars = [{id: 1, name:"WW2"},{id: 2, name:"Korea"},{id: 3, name:"Vietnam"}];
    model.war = model.wars[0];


    $log.debug("Contact type is: " + model.contactType);
    $log.debug("ContactController::Begin");
}
angular.module('hf').controller('ContactController', ContactController);