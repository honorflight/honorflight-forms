function ServiceAward(railsResourceFactory){
  return railsResourceFactory({
    url: '/api/service_awards',
    name: 'serviceAward'
  });
}
angular.module('contact').factory('ServiceAward',ServiceAward);