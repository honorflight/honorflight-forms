function MonthYearDateSerializer() {
    var dateSerializer = function(){};
    dateSerializer.prototype.serialize = function (value) {
      var parts = value.split('/');
      return new Date(parseInt(parts[1], 10),
                  parseInt(parts[0], 10) - 1);
    };
    dateSerializer.prototype.deserialize = function (jsonDate) {
        if (angular.isDate(jsonDate)) {
            return jsonDate;
        }
        var parts = jsonDate.split('-');
        return new Date(parts[0], parts[1]-1, "1");
    };
    return dateSerializer;
}
angular.module('hf').factory('MonthYearDateSerializer', MonthYearDateSerializer);


function MedicalCondition(railsResourceFactory, railsSerializer, MonthYearDateSerializer){
  return railsResourceFactory({
    url: '/api/medical_conditions',
    name: 'medicalCondition',
    serializer: railsSerializer(function(){
      this.serializeWith('lastOccurrence', MonthYearDateSerializer);
    })
  });
}
angular.module('contact').factory('MedicalCondition',MedicalCondition);
