angular.module('hf').filter('monthYearDate', function() {
	return function(input) {

    if (typeof input === "string") {
      return [input.substring(2, 0), input.substring(6, 2)].join("/");
    } else if (_.isDate(new Date())) {
      return [("0" + input.getMonth()).slice(-2), input.getFullYear().toString()].join("/");
    }
		
	};
});