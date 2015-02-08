function Person($resource){
  var person = $resource('/api/people', {}, {
    'query': {method: 'GET', isArray: true },
    'get': {method: 'GET'}
  });

  return person;
}

angular.module('hf').factory('person',Person);