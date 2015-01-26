force api -> removing some may-be-useful code-later

// require 'vars.php';

// define("SALESFORCE_TOOLKIT_ROOT", dirname(__FILE__)."/../Force.com-Toolkit-for-PHP/");
// require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

// A controller file
// require_once "handles.php";
// include 'honorflight-forms-plugin/php/salesforce-api.php';


POST REQUEST - Generic
// Removing example of generic mapping
  // $app->post('/api/:form_name/submit', function($method)use($app){
  //    //Pass App context to routing method
  //    $method($app);
  //  });

  // $app->get('/api/:object', function($method)use($app){
  //   $method($app);
  // });


CORS EXAMPLE???
    // call salesforce with $object
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Methods: GET");
    // header("Content-Type: application/json");

// =======
//  $app->post('/api/:form_name/submit', function(){echo "Unhandled url";});
//     $app->post('/api/guardianContact/submit', function($app){
//          $app->response->setBody("test". guardianContactForm(Slim::getInstance()->request->getBody()));
//     });

//     $app->post('/api/veteranContact/submit', function($app){
//         return veteranContactForm(Slim::getInstance()->request->getBody());
//     });
// >>>>>>> 6f4432de63d8287fd986ea5672f28da0356b9e09
// $app->get('/api/:form_name/variables', function(){echo "Unhandled url";});
// $app->get('/api/reference_data/:type', 'getReference');
// $app->get('/api/sforce/:model', 'sforce_get');



