<?php
/**
 * This is the routes file.  Put RESTful routes here to
 * conform to Angular conventions.
 *
 * Keep application logic in separate controller files,
 * like the example sforce.php.
 *
 * This API is using Slim and WP-Slim:
 *   -> https://github.com/codeguy/Slim/
 *   -> https://github.com/Botnary/wp-slim-framework
 */
require 'force/force.php';
// require 'vars.php';

// define("SALESFORCE_TOOLKIT_ROOT", dirname(__FILE__)."/../Force.com-Toolkit-for-PHP/");
// require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

// A controller file
// require_once "handles.php";
// include 'honorflight-forms-plugin/php/salesforce-api.php';

//replace empty functions with handles
add_action("slim_mapping", function($app){
	header("Slim: Remap");
// Removing example of generic mapping
  // $app->post('/api/:form_name/submit', function($method)use($app){
  //    //Pass App context to routing method
  //    $method($app);
  //  });

  // $app->get('/api/:object', function($method)use($app){
  //   $method($app);
  // });
  $app->get('/api/force/:obj_type', function($object)use($app){
    // call salesforce with $object
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Methods: GET");
    // header("Content-Type: application/json");
    query_salesforce($object);
  });
// =======
// 	$app->post('/api/:form_name/submit', function(){echo "Unhandled url";});
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
});

?>
