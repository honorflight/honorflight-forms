function Force($resource){
  var force = $resource('http://honorflight-rails.dev/api/v1/:object_type', {}, {
    'query': {method: 'GET', isArray: true },
    'get': {method: 'GET'}
  });

  // force.query({object_type: 'wars'});
  // force.query({object_type: 'shirt_sizes'});

  return force;
}
angular.module('hf').factory('Force',Force);