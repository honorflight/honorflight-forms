angular.module('contact').factory('person',function() {

	var person = {};

  person.hello = function(){
    return "World";
  };

	return person;
});