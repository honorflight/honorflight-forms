function Person($resource){
  var person = $resource('/api/people/:id', {}, {
    'query': {method: 'GET', isArray: true },
    'get': {method: 'GET'},
    'update': {method: 'PUT'}
  });

  return person;
}

angular.module('hf').factory('person',Person);