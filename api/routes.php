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


//replace empty functions with handles
add_action("slim_mapping", function($app){
	header("Slim: Remap");
	$app->post('/api/:form_name/submit', function(){echo "Unhandled url";});
	$app->get('/api/:form_name/variables', function(){echo "Unhandled url";});
	$app->get('/api/reference_data/:type', 'getReference');
	$app->get('/api/sforce/:model', 'sforce_get');
});

?>
