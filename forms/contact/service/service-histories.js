function ServiceHistory(railsResourceFactory){

	var serviceHistory = railsResourceFactory({
		url: '/api/service_histories',
		name: 'serviceHistory'
	});

	return serviceHistory;
}
angular.module('contact').factory('ServiceHistory',ServiceHistory);