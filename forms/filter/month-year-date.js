angular.module('hf').filter('monthYearDate', function() {
	return function(input) {

    // String
    if ( _.isString(input)) {
      if ( input.length <= 5) {
        return "";
      } else {
        return [input.substring(2, 0), input.substring(6, 2)].join("/");
      }
    }

    // Date or other
    if (_.isDate(input)) {
      return [("0" + input.getMonth()).slice(-2), input.getFullYear().toString()].join("/");
    } else {
      return "";
    }
		
	};
});