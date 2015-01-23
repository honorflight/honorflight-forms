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
        $custom_bootstrap_path = "/wp-content/plugins/honorflight-forms/honorflight-forms-plugin/css/hf-bootstrap.css";
        ?><link rel='stylesheet' href='<?php echo $custom_bootstrap_path; ?>' type='text/css' /> <?php
        echo '';
    }
}
add_filter('css_injection', 'inject_css');

function inject_javascripts() {
    if (is_page('Application')) {
        echo '';
        echo '<style>/* JEFF */</style>';
        echo '';
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