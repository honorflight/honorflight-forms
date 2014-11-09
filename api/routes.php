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


// A controller file
require_once "handles.php";
include 'honorflight-forms-plugin/php/salesforce-api.php';

//replace empty functions with handles
add_action("slim_mapping", function($app){
	header("Slim: Remap");
	$app->post('/api/:form_name/submit', function(){echo "Unhandled url";});
    $app->post('/api/guardianContact/submit:', function(){
        contactForm(Slim::getInstance()->request->getBody());
    });
	$app->get('/api/:form_name/variables', function(){echo "Unhandled url";});
	$app->get('/api/reference_data/:type', 'getReference');
	$app->get('/api/sforce/:model', 'sforce_get');
});

?>
