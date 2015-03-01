
// ngResource
function Reference($resource){
  var reference = $resource('/api/:object_type', {}, {
    'query': {method: 'GET', isArray: true },
    'get': {method: 'GET'}
  });

  // reference.query({object_type: 'wars'});
  // reference.query({object_type: 'shirt_sizes'});

  return reference;
}
angular.module('hf').factory('Reference',Reference);