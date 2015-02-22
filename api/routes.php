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

  // Route will remap to api url and return results
  $app->{$_SERVER['REQUEST_METHOD']}('/api/:route+', function($url_array)use($app){
  	route($app, $url_array);
  });

});

?>
