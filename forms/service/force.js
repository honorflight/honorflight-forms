function Force($resource){
  var force = $resource('http://localhost/api/force/:object_type', {}, {
    'query': {method: 'GET', isArray: true },
    'get': {method: 'GET'}
  });

  // force.query({object_type: 'wars'});

  return force;
}
angular.module('hf').factory('Force',Force);