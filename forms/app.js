angular.module('hf', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ui.select', 'ngAnimate', 'ngResource', 'contact']);

function MainController($log){
  $log.debug("MainController::Begin");

  /* This is where we will add 'global-ish' function */

  $log.debug("MainController::End");
}
angular.module('hf').controller('MainController', MainController);

function ContactInfoController($log, wars){
  var model = this;
  $log.debug("ContactInfoController::Begin");

  model.wars = wars;

  $log.debug("ContactInfoController::End");
}
angular.module('hf').controller('ContactInfoController', ContactInfoController);

angular.module('hf').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('applications', {
        url: '/applications?{contactType}',
        templateUrl: "templates/form.html",
        controller: 'ContactController as contact',
        abstract: true,
        // resolve: {
        //   referenceResource: 'ReferenceData',
        //   referenceData: function(referenceResource){
        //     return referenceResource.query();
        //   }
        // }
    });

    $stateProvider.state('applications.home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      // controller: 'GeneralInformationController as info'
    });

    $stateProvider.state('applications.contactInfo', {
      url: '/contactInfo',
      templateUrl: 'templates/contactInfo.html',
      controller: 'ContactInfoController as contactInfo',
      resolve: {
        forceResource: 'Force',
        wars: function(forceResource){
          return forceResource.query({object_type: 'wars'});
        }
      }
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/applications/home');

});

angular.module('hf').config(function(uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
  uiSelectConfig.resetSearchInput = true;
});

angular.module('hf').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
