function DateSerializer() {
		var dateSerializer = function(){};
    dateSerializer.prototype.serialize = function (value) {
        return value;
    };
    dateSerializer.prototype.deserialize = function (jsonDate) {
        if (angular.isDate(jsonDate)) {
            return jsonDate;
        }
				var parts = jsonDate.split('-');
				return new Date(parts[0], parts[1]-1, parts[2]);
    };
    return dateSerializer;
}
angular.module('hf').factory('DateSerializer', DateSerializer);


function PersonSerializer(railsSerializer, $log, DateSerializer){
	var personSerializer = railsSerializer(function(){
		this.nestedAttribute('address');
		this.serializeWith('birthDate', DateSerializer);
	});

	return personSerializer;
}
angular.module('hf').factory('PersonSerializer', PersonSerializer);

function Person(railsResourceFactory, railsSerializer, $log){

	var person = railsResourceFactory({
		url: '/api/people',
		name: 'person',
		serializer: 'PersonSerializer'
	});

	return person;
}
angular.module('hf').factory('Person',Person);