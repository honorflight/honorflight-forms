function GeneralInformationController(GeneralInformationService) {
    var GeneralInfoController = {};

    function GeneralInfo(){
        this.firstName = "";
        this.lastName = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.zipCode = "";
        this.county = "";
        this.homePhone = "";
        this.cellPhone = "";
        this.email = "";
        this.war = "";
    }

    GeneralInfoController.generalInfo = new GeneralInfo();
    GeneralInfoController.submitted = false;

    //this.saveVeteranInfo = GeneralInformationService.saveGeneralInfo(this.generalInfo);

    GeneralInfoController.saveGeneralInfo = function() {
        var test;
    };

    return GeneralInfoController;
}

angular.module('hf').controller('GeneralInformationController', GeneralInformationController);
