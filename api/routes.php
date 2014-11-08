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
require_once "sforce.php";

add_action("slim_mapping", function($app){
	// Put all routes in here
	$app->get('/api/sforce/:model', 'sforce_get');

});

?>
