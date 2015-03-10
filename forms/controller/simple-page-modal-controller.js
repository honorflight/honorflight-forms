function SimplePageModalController($log, $sce, $modalInstance, simplePage){
  $log.debug("SimplePageModalController::Begin");
  var model = this;

  model.page = simplePage;

  model.trustedHtml = function(){
    return $sce.trustAsHtml(model.page.html);
  };

  model.accept = function(){
    $modalInstance.close('accepted');
  };

  model.cancel = function(){
    $modalInstance.dismiss('cancel');
  };

  $log.debug("SimplePageModalController::End");
}
angular.module('hf').controller('SimplePageModalController', SimplePageModalController);