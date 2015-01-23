<?php
/**
 * Created by PhpStorm.
 * User: mattlodes
 * Date: 11/7/14
 * Time: 7:16 PM
 */


function inject_css() {
    if (is_page('Application')) {
        /* Jeff\'s CRAP */;
        /* PUKE */
        $custom_css_path = "/wp-content/plugins/honorflight-forms/honorflight-forms-plugin/dist/app.full.min.css";
        ?><link rel='stylesheet' href='<?php echo $custom_css_path; ?>' type='text/css' /> <?php
        echo '';
    }
}
add_filter('css_injection', 'inject_css');

function inject_javascripts() {
    if (is_page('Application')) {
        $custom_js_path = "/wp-content/plugins/honorflight-forms/honorflight-forms-plugin/dist/app.full.min.js";
        ?><script type='text/javascript' src='<?php echo $custom_js_path; ?>'></script> <?php
    }
}
add_filter('javascript_injection', 'inject_javascripts');



function skip_title($title, $id){
    if (is_page('Application')) {
        $title = '';
    }
    return $title;
}
add_filter('the_title', 'skip_title', 10, 2);


//Hooks a function to a filter action, 'the_content' being the action, 'hello_world' the function.
add_filter('the_content','app_type');

//Callback function
function app_type($content)
{

        $Path=$_SERVER['REQUEST_URI'] ;
        $vet='[[vetapp]]';

        //Checking if on post page.
            //Adding custom content to end of post.

        if (strpos($content, $vet) !== false) {
            return str_replace("[[vetapp]]", "<div ng-app='hfApp' ng-controller='MainController as main' class='bootstrap'><div ui-view=''></div></div>", $content);
        } 
        else {
            //else on blog page / home page etc, just return content as usual.
            return $content;
        }
}

?>   