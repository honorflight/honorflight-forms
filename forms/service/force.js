function Force($resource){
  var force = $resource('/api/force/:object_type', {}, {
    'query': {method: 'GET', isArray: true },
    'get': {method: 'GET'}
  });

  // force.query({object_type: 'wars'});
  // force.query({object_type: 'shirt_sizes'});

  return force;
}
angular.module('hf').factory('Force',Force);