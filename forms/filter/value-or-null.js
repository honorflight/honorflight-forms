angular.module('hf').filter('valueOrNull', function($log, lodash) {
	return function(inputs, key, value) {
		
		var object = {};
		object[key]=value;

		// Look for matching values first
		var values = lodash.filter(inputs, object);

		object[key]=null;

		// Look for null values now
		var nulls = lodash.filter(inputs, object);

		// smash the two together
		var retVal = lodash.flatten([values, nulls],true);

		return retVal;
	};
});