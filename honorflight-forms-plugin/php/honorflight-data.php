<?php
/**
 * Created by PhpStorm.
 * User: mattlodes
 * Date: 11/7/14
 * Time: 7:16 PM
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