//var modules = angular.module('VeteranPersonalInfo', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

//modules.controller('VeteranPersonalInformationController', ['$scope', 'ReferenceDataService', 'VeteranPersonalInformationService', 'sharedValues',
//    function ($scope, ReferenceDataService, VeteranPersonalInformationService, sharedValues) {
function VeteranPersonalInformationController(ReferenceDataService, VeteranPersonalInformationService, sharedValues) {
    this.veteranInfo = new VeteranInfo();
    this.submitted = false;

    function VeteranInfo(){
        this.firstName = "";
        this.lastName = "";
        this.middleName = "";
        this.nickname = "";
        this.dateOfBirth = "";
        this.age = "";
        this.tShirtSize = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.county = "";
        this.homePhone = "";
        this.cellPhone = "";
        this.email = "";
    }

    this.saveVeteranInfo = function() {

        this.submitted = true;

        if(!this.veteranPersonalInfoForm.$invalid){
            VeteranPersonalInformationService.sendForm(this.veteranInfo).then(processSaveResponse);
        }
    };

    function validateVeteran() {
        if(this.veteranInfo.homePhone.length === 0 && this.veteranInfo.cellPhone.length === 0 && this.veteranInfo.email.length === 0) {
            this.veteranPersonalInfoForm.saveVeteranInformation.$error.contactInfo = false;
        }
    }

    function processSaveResponse(response) {
        if(response.key) {
            //Saved successfully
        } else {
            //Save failed process response.message
        }
    }

    ReferenceDataService.getReferenceData('Veteran').then(processReferenceData);

    function processReferenceData(referenceData) {
        this.shirtSizes = referenceData.SHIRT_SIZE__c;
    }

    util.setBreadcrumb('#veteranPersonalInformation');
}
//]).factory('VeteranPersonalInformationService', ['$http', function ($http) {
//    return {
//        sendForm: function (veteranInfo) {
//            return $http.post('url',veteranInfo);
//        }
//    };
//}]);
