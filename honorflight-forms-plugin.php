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


require_once "api/routes.php";

include 'honorflight-forms-plugin/php/salesforce-api.php';
include 'honorflight-forms-plugin/php/honorflight-data.php';

?>