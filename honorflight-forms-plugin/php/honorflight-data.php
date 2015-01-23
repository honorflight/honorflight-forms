<?php
/**
 * Created by PhpStorm.
 * User: mattlodes
 * Date: 11/7/14
 * Time: 7:16 PM
 */

//Hooks a function to a filter action, 'the_content' being the action, 'hello_world' the function.
add_filter('the_content','app_type');

//Callback function
function app_type($content)
{

        $Path=$_SERVER['REQUEST_URI'] ;
        $vet='[[vetapp]]';
        $guard='[[guardapp]]';
        $vol='[[volapp]]';
        //Checking if on post page.
            //Adding custom content to end of post.

        if (strpos($content, $vet) !== false) {
            return $content . 'It works';
        } 
        elseif (strpos($content, $guard) !== false) {
            return $content . 'It works';
        }
        elseif (strpos($content, $vol) !== false) {
            return $content . 'It works';
        }
        else {
            //else on blog page / home page etc, just return content as usual.
            return $content;
        }
}

?>   