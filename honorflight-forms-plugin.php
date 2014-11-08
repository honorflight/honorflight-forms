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
//Hooks a function to a filter action, 'the_content' being the action, 'hello_world' the function.
add_filter('the_content','hello_world');

//Callback function
function hello_world($content)
{
	//Checking if on post page.
	if ( is_single() ) {
		//Adding custom content to end of post.
		return $content . "<h1> Hello World </h1>";
	}
	else {
		//else on blog page / home page etc, just return content as usual.
		return $content;
	}
}

?>