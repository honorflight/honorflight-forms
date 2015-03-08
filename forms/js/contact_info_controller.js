function ContactInfoController($log, $state, $modal, wars, shirtSizes, SimplePage){
    var model = this;
    $log.debug("ContactInfoController::Begin");

    model.wars = wars;
    model.shirtSizes = shirtSizes;

    model.promises = [wars, shirtSizes];

    model.open = function(modalContext){
        $log.debug("Opening: " + modalContext);

        var modalInstance = $modal.open({
          templateUrl: 'templates/simple_page_modal.html',
          controller: 'SimplePageController as simplePage',
          size: 'lg',
          windowClass: 'bootstrap',
          resolve: {
            simplePage: function(SimplePage){
              return SimplePage.get({key: modalContext});
            }
          }
        });

        modalInstance.result.then(function (message) {
          $log.debug('modal accepted');
        }, function () {
          $log.debug('Modal dismissed');
        });
    };

    $log.debug("ContactInfoController::End");
}
angular.module('hf').controller('ContactInfoController', ContactInfoController);
