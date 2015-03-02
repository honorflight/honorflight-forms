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
		this.resource('serviceHistory', 'ServiceHistory');
		this.serializeWith('birthDate', DateSerializer);
	});

	return personSerializer;
}
angular.module('contact').factory('PersonSerializer', PersonSerializer);




function Person($log, railsResourceFactory, railsSerializer, ServiceHistory){
	var person = railsResourceFactory({
		url: '/api/people',
		name: 'person',
		serializer: 'PersonSerializer'
	});

	person.prototype.saveServiceHistory = function(data){
		return ServiceHistory.$post(this.$url('service_histories'), data);
	};

	return person;
}


// Person.prototype.saveServiceHistory = function(data){
// 	return ServiceHistory.$put(this.$url('service_histories'), data);
// };
angular.module('contact').factory('Person',Person);