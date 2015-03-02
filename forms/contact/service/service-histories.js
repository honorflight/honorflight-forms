// function ServiceHistory($resource){
// 	var serviceHistory = $resource('/api/people/:person_id/service_histories', {}, {
// 		// 'query':{method: 'GET', isArray: true},
// 		// 'get': {method: 'GET'},
// 		'update': {method: 'PUT', url: '/api/service_histories/:id'}
// 	});

// 	return serviceHistory;
// }
function ServiceHistory(railsResourceFactory, railsSerializer, ServiceAward){
  var resource =  railsResourceFactory({
    url: '/api/service_histories',
    name: 'serviceHistory',
    serializer: railsSerializer(function(){
      this.nestedAttribute('serviceAwards');
    })
  });

  resource.prototype.getServiceAwards = function(){
    return ServiceAward.$get(this.$url('service_awards'));
  };

  return resource;
}
angular.module('contact').factory('ServiceHistory',ServiceHistory);