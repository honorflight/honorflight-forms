function SimplePageController($log, $sce, simplePage){
  $log.debug("SimplePageController::Begin");
  var model = this;

  model.page = simplePage;

  model.trustedHtml = function(){
    return $sce.trustAsHtml(model.page.html);
  };

  $log.debug("SimplePageController::End");
}
angular.module('hf').controller('SimplePageController', SimplePageController);