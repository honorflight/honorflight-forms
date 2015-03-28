function AlternateContact(railsResourceFactory, railsSerializer){
  var resource =  railsResourceFactory({
    url: '/api/contacts',
    name: 'contact',
    serializer: railsSerializer(function(){
      this.nestedAttribute('address');
    })
  });
  return resource;
}
angular.module('contact').factory('AlternateContact', AlternateContact);