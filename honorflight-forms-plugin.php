<?php
/*
Plugin Name: HonorFlight Forms Plugin
Plugin URI: http://gslhonorflight.org
Description: The HonorFlight Forms plugin is a custom plugin for Greater St. Louis Honor Flight integrations
Version: 0.0
Author: Students and Co-workers
Author URI: http://wustl.edu
License: GPL2
*/

/*  Admin Menu */
class options_page {

  function __construct() {
    add_action( 'admin_menu', array( $this, 'admin_menu' ) );
  }

  function admin_menu () {
    add_options_page( 'Honor Flight Options','Honor Flight Options','manage_options','options_page_slug', array( $this, 'settings_page' ) );
  }

  function  settings_page () {
    include 'honorflight-forms-plugin/admin/settings.php';
  }

}
new options_page;
/* End Admin Menu */

require "api/routes.php";
// require "honorflight-forms-plugin/php/honorflight-data.php";

function inject_css() {
    if (is_page('Application')) {
        $custom_css_path = "/wp-content/plugins/honorflight-forms/honorflight-forms-plugin/dist/app.full.min.css";
        ?><link rel='stylesheet' href='<?php echo $custom_css_path; ?>' type='text/css' /> <?php
        echo '';
    }
}
add_action('wp_head', 'inject_css');

function inject_javascripts() {
    if (is_page('Application')) {
        $custom_js_path = "/wp-content/plugins/honorflight-forms/honorflight-forms-plugin/dist/app.full.min.js";
        ?><script type='text/javascript' src='<?php echo $custom_js_path; ?>'></script> <?php
    }
}
add_action('wp_head', 'inject_javascripts');

function skip_title($title, $id){
    if (is_page('Application')) {
        $title = '';
    }
    return $title;
}
add_filter('the_title', 'skip_title', 10, 2);

function app_type($content)
{

        $Path=$_SERVER['REQUEST_URI'] ;
        $vet='[[vetapp]]';

        if (strpos($content, $vet) !== false) {
            return str_replace("[[vetapp]]", "<div ng-app='hf' ng-controller='MainController as main'><div><div class='row'><div ui-view=''></div></div></div></div>", $content);
        }
        else {
            //else on blog page / home page etc, just return content as usual.
            return $content;
        }
}

//Hooks a function to a filter action, 'the_content' being the action, 'hello_world' the function.
add_filter('the_content','app_type');


?>
