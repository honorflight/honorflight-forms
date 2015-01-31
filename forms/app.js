angular.module('hf', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ui.select', 'ngAnimate', 'ngResource', 'angular.filter', 'contact']);

function MainController($log){
  $log.debug("MainController::Begin");

  /* This is where we will add 'global-ish' function */

  $log.debug("MainController::End");
}
angular.module('hf').controller('MainController', MainController);

angular.module('hf').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('applications', {
        url: '/applications?{contactType}',
        templateUrl: "templates/form.html",
        controller: 'ContactController as contact',
        abstract: true
    });

    $stateProvider.state('applications.home', {
      url: '/home',
      templateUrl: 'templates/home.html'
    });

    $stateProvider.state('applications.contactInfo', {
      url: '/contactInfo',
      templateUrl: 'templates/contact_info.html',
      controller: 'ContactInfoController as contactInfo',
      resolve: {
        forceResource: 'Force',
        wars: function(forceResource){
          return forceResource.query({object_type: 'wars'});
        }
      }
    });

    $stateProvider.state('applications.address', {
        url: '/address',
        templateUrl: 'templates/address.html',
        controller: 'AddressController as address'
    });

    $stateProvider.state('applications.serviceHistory', {
        url: '/serviceHistory',
        templateUrl: 'templates/service_history.html',
        controller: 'ServiceHistoryController as serviceHistory',
        resolve: {
          forceResource: 'Force',
          serviceBranches: function(forceResource){
            return forceResource.query({object_type: 'service_branches'}).$promise;
          },
          serviceRankTypes: function(forceResource){
            return forceResource.query({object_type: 'service_rank_types'});
          },
          serviceRanks: function(forceResource){
            return forceResource.query({object_type: 'service_ranks'});
          },
        }
    });

    $stateProvider.state('applications.serviceAwards', {
        url: '/serviceAwards',
        templateUrl: 'templates/service_awards.html',
        controller: 'ServiceAwardsController as serviceAwards',
        resolve: {
          forceResource: 'Force',
          serviceAwards: function(forceResource){
            return forceResource.query({object_type: 'service_awards'});
          }
        }
    });

    $stateProvider.state('applications.medicalCondition', {
        url: '/medicalCondition',
        templateUrl: 'templates/veteran/medical_condition.html',
        controller: 'MedicalConditionController as medicalCondition'
        //,
        //resolve: {
        //    forceResource: 'Force',
        //    conditionInfo: function(forceResource){
        //        return forceResource.query({object_type: 'conditionInfo'});
        //    }
        //}
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
