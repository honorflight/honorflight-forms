angular.module('hf', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

function MainController($log){
  $log.debug("MainController::Begin");

  /* This is where we will add 'global-ish' function */

  $log.debug("MainController::End");
}
angular.module('hf').controller('MainController', MainController);

angular.module('hf').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('applications', {
        url: '/applications',
        template: "<div ui-view=''></div>",
        abstract: true
    });

    $stateProvider.state('applications.home', {
      url: '/home',
      templateUrl: 'templates/veteran/General_Information.html',
        controller: 'GeneralInformationController',
        controllerAs: 'GeneralInfoController'
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/applications/home');

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
