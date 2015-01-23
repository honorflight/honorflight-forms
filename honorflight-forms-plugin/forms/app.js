angular.module('hfApp', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

function MainController($log){

}
angular.module('hfApp').controller('MainController', MainController);

angular.module('hfApp').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('application', {
        url: '/application',
        templateUrl: 'templates/application.html'
    });

    /* Add New States Above */
    $urlRouterProvider.otherwise('/application');

});

angular.module('hfApp').run(function($rootScope) {

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
