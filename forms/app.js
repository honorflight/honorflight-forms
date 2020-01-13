angular.module("hf", [
    "ui.bootstrap",
    "ui.utils",
    "ui.router",
    "ui.select",
    "ngAnimate",
    "ngResource",
    "ngSanitize",
    "rails",
    "ngLodash",
    "angular.filter",
    "cgBusy",
    "contact"
]);

function MainController($log) {
    $log.debug("MainController::Begin");

    /* This is where we will add 'global-ish' function */

    $log.debug("MainController::End");
}
angular.module("hf").controller("MainController", MainController);

angular.module("hf").config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state("applications", {
        url: "/applications?{contactType}",
        templateUrl: "templates/form.html",
        controller: "ContactController as contact",
        abstract: true
    });

    $stateProvider.state("applications.home", {
        url: "/home",
        templateUrl: "templates/home.html"
    });

    $stateProvider.state("applications.contactInfo", {
        url: "/contactInfo",
        templateUrl: "templates/contact_info.html",
        controller: "ContactInfoController as contactInfo",
        resolve: {
            referenceResource: "Reference",
            wars: function(referenceResource) {
                return referenceResource.query({ object_type: "wars" });
            },
            shirtSizes: function(referenceResource) {
                return referenceResource.query({ object_type: "shirt_sizes" });
            },
            nameSuffixes: function(referenceResource) {
                return referenceResource.query({
                    object_type: "name_suffixes"
                });
            }
        }
    });

    $stateProvider.state("applications.alternateContact", {
        url: "/alternateContact",
        templateUrl: "templates/alternate_contact.html",
        controller: "AlternateContactController as alternateContact",
        resolve: {
            referenceResource: "Reference",
            contactRelationships: function(referenceResource) {
                return referenceResource.query({
                    object_type: "contact_relationships"
                });
            }
        }
    });

    $stateProvider.state("applications.serviceHistory", {
        url: "/serviceHistory",
        templateUrl: "templates/service_history.html",
        controller: "ServiceHistoryController as serviceHistory",
        resolve: {
            referenceResource: "Reference",
            serviceBranches: function(referenceResource) {
                return referenceResource.query({ object_type: "branches" });
            },
            serviceRankTypes: function(referenceResource) {
                return referenceResource.query({ object_type: "rank_types" });
            },
            serviceRanks: function(referenceResource) {
                return referenceResource.query({ object_type: "ranks" });
            },
            serviceAwards: function(referenceResource) {
                return referenceResource.query({ object_type: "awards" });
            }
        }
    });

    $stateProvider.state("applications.medicalConditions", {
        url: "/medicalConditions",
        templateUrl: "templates/veteran/medical_condition.html",
        controller: "MedicalConditionController as medicalCondition",
        resolve: {
            referenceResource: "Reference",
            medicalConditionTypes: function(referenceResource) {
                return referenceResource.query({
                    object_type: "medical_condition_types"
                });
            },
            medicalConditionNames: function(referenceResource) {
                return referenceResource.query({
                    object_type: "medical_condition_names"
                });
            }
        }
    });

    $stateProvider.state("applications.volunteerInfo", {
        url: "/volunteerInfo",
        templateUrl: "templates/volunteer_info.html"
    });

    $stateProvider.state("applications.thanksVolunteers", {
        url: "/thanks_volunteers",
        templateUrl: "templates/simple_page.html",
        controller: "SimplePageController as simplePage",
        resolve: {
            simplePageResource: "SimplePage",
            simplePage: function(simplePageResource) {
                return simplePageResource.get({ key: "thanks_volunteers" });
            }
        }
    });

    $stateProvider.state("applications.thanks", {
        url: "/thanks",
        templateUrl: "templates/simple_page.html",
        controller: "SimplePageController as simplePage",
        resolve: {
            simplePageResource: "SimplePage",
            simplePage: function(simplePageResource) {
                return simplePageResource.get({ key: "thank_you" });
            }
        }
    });

    /* Add New States Above */
    // $urlRouterProvider.otherwise('/applications/home');\
    // Initial release will only have one contact type
    $urlRouterProvider.otherwise(
        "/applications/contactInfo?contactType=veteran"
    );
});

angular.module("hf").config(function(uiSelectConfig) {
    uiSelectConfig.theme = "bootstrap";
    uiSelectConfig.resetSearchInput = true;
});

// angular.module('hf').config(function(httpRequestInterceptorCacheBusterProvider){
//   httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*people.*/,/.*medical_conditions.*/],true);
// });

angular.module("hf").run(function($rootScope) {
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === "$apply" || phase === "$digest") {
            if (fn && typeof fn === "function") {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
});
