<?php
  //must check that the user has the required capability 
    if (!current_user_can('manage_options'))
    {
      wp_die( __('You do not have sufficient permissions to access this page.') );
    }

    // variables for the field and option names 
    $opt_apikey = 'apikey';

    $hidden_field_name = 'sf_submit_hidden';

    $data_apikey = 'apikey';

    // Read in existing option value from database
    $opt_val_apikey = get_option( $opt_apikey );

    $updated = false;
    if( isset($_POST[ $hidden_field_name ]) && $_POST[ $hidden_field_name ] == 'Y' ) {


        if (isset($_POST[ $data_apikey ])) {
          $opt_val_apikey = $_POST[ $data_apikey ];
          update_option( $opt_apikey, $opt_val_apikey );
          $updated = true;
        }
        // Put an settings updated message on the screen

?>
<div class="updated"><p><strong><?php _e('settings saved.', 'menu-test' ); ?></strong></p></div>
<?php

    }

    // Now display the settings editing screen

    echo '<div class="wrap">';

    // header

    echo "<h2>" . __( 'Honor Flight API Settings', 'menu-test' ) . "</h2>";

    // settings form
    
    ?>

<form name="form1" method="post" action="">
  <input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y">

  <h3>Honor Flight API:</h3>
  <p><?php _e("API Key:", 'menu-test' ); ?> 
    <input type="password" name="<?php echo $data_apikey; ?>" value="<?php echo $opt_val_apikey; ?>" size="20">
  </p>

  <p class="submit">
    <input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Save Changes') ?>" />
  </p>

</form>
</div>

