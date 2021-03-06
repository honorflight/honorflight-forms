// extract eventually
function DateSerializer() {
		var dateSerializer = function(){};
    dateSerializer.prototype.serialize = function (value) {
      var parts = value.split('/');
      return new Date(parseInt(parts[2], 10),
                  parseInt(parts[0], 10) - 1,
                  parseInt(parts[1], 10));
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




function Person($log, railsResourceFactory, railsSerializer, AlternateContact, ServiceHistory, MedicalCondition){
	var person = railsResourceFactory({
		url: '/api/people',
		name: 'person',
		serializer: 'PersonSerializer'
	});

  person.prototype.saveAlternateContact = function(data){
    return AlternateContact.$post(this.$url('contacts'), data);
  };

  person.prototype.saveServiceHistory = function(data){
    return ServiceHistory.$post(this.$url('service_histories'), data);
  };

  person.prototype.saveMedicalCondition = function(data){
    return MedicalCondition.$post(this.$url('medical_conditions'), data);
  };

  person.prototype.getMedicalConditions = function(){
    return MedicalCondition.$get(this.$url('medical_conditions'));
  };

	return person;
}


// Person.prototype.saveServiceHistory = function(data){
// 	return ServiceHistory.$put(this.$url('service_histories'), data);
// };
angular.module('contact').factory('Person',Person);