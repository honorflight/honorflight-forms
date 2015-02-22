function ServiceHistory($resource){
	var serviceHistory = $resource('/api/people/:person_id/service_histories', {}, {
		'query':{method: 'GET', isArray: true},
		'get': {method: 'GET'},
		'update': {method: 'PUT', url: '/api/service_histories/:id'}
	});

	return serviceHistory;
}

angular.module('contact').factory('serviceHistories',ServiceHistory);