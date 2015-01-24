function ReferenceData($resource){
	var reference = $resource('localhost/', {}, {
		'query': {method: 'GET', isArray: true },
		'get': {method: 'GET'}
	});

	return reference;
}

angular.module('hf').factory('ReferenceData',ReferenceData);
