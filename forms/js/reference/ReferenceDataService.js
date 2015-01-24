'use strict';

var modules = angular.module('ReferenceData', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

modules.factory('ReferenceDataService', ['$http', '$q',
    function($http, $q) {
        return {
            getReferenceData: function(objectType) {
                var url = "http://bigblur.com/wp-content/plugins/honorflight-forms/honorflight-forms-plugin/api/reference_data.php?sobject_type="+objectType;
                var defer = $q.defer();

                $http.get(url).then(function (result) {
                    defer.resolve(result.data);
                }, function () {
                    defer.reject('Unable to get '+ objectType +'!');
                });

                return defer.promise;
            }
        };
    }
]);