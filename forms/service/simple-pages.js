function SimplePage($resource){
  var simplePage = $resource('/api/simple_pages/:key', {}, {
    'get': {method: 'GET'}
  });
  return simplePage;
}

angular.module('hf').factory('SimplePage',SimplePage);