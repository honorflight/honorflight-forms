function MedicalCondition(railsResourceFactory){
  return railsResourceFactory({
    url: '/api/medical_conditions',
    name: 'medicalCondition'
  });
}
angular.module('contact').factory('MedicalCondition',MedicalCondition);
