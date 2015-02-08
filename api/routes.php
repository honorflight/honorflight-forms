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
// require 'force/force.php';
require 'person-proxy.php';

//replace empty functions with handles
add_action("slim_mapping", function($app){
	header("Slim: Remap");
  // $app->get('/api/force/:obj_type', function($object)use($app){
  //   query_salesforce($object);
  // });

  // /api/person -> function person()
  $app->post('/api/:form_name', function($method)use($app){
     //Pass App context to routing method
     $method($app);
   });
});

?>
