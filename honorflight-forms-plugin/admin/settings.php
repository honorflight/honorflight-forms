<?php
  //must check that the user has the required capability 
    if (!current_user_can('manage_options'))
    {
      wp_die( __('You do not have sufficient permissions to access this page.') );
    }

    // variables for the field and option names 
    $opt_user = 'sforce_api_user';
    $opt_password = 'sforce_api_password';
    $opt_secret = 'sforce_api_secret';
    $opt_apikey = 'apikey';

    $hidden_field_name = 'sf_submit_hidden';

    $data_field_user = 'sforce_api_user';
    $data_field_password = 'sforce_api_password';
    $data_field_secret = 'sforce_api_secret';
    $data_apikey = 'apikey';

    // Read in existing option value from database
    $opt_val_user = get_option( $opt_user );
    $opt_val_password = get_option( $opt_password );
    $opt_val_secret = get_option( $opt_secret );
    $opt_val_apikey = get_option( $opt_apikey );

    $updated = false;
    if( isset($_POST[ $hidden_field_name ]) && $_POST[ $hidden_field_name ] == 'Y' ) {


        if (isset($_POST[ $data_field_user ])) {
          $opt_val_user = $_POST[ $data_field_user ];
          update_option( $opt_user, $opt_val_user );
          $updated = true;
        }
        if (isset($_POST[ $data_field_password ])) {
          $opt_val_password = $_POST[ $data_field_password ];
          update_option( $opt_password, $opt_val_password );
          $updated = true;
        }
        if (isset($_POST[ $data_field_secret ])) {
          $opt_val_secret = $_POST[ $data_field_secret ];
          update_option( $opt_secret, $opt_val_secret );
          $updated = true;
        }
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

    echo "<h2>" . __( 'Honor Flight Salesforce Settings', 'menu-test' ) . "</h2>";

    // settings form
    
    ?>

<form name="form1" method="post" action="">
  <input type="hidden" name="<?php echo $hidden_field_name; ?>" value="Y">

  <h3>Honor Flight API:</h3>
  <p><?php _e("User/Email:", 'menu-test' ); ?> 
    <input type="text" name="<?php echo $data_field_user; ?>" value="<?php echo $opt_val_user; ?>" size="20">
  </p>

  <p><?php _e("Password:", 'menu-test' ); ?> 
    <input type="password" name="<?php echo $data_field_password; ?>" value="<?php echo $opt_val_password; ?>" size="20">
  </p>

  <p><?php _e("Secret Token:", 'menu-test' ); ?> 
    <input type="password" name="<?php echo $data_field_secret; ?>" value="<?php echo $opt_val_secret; ?>" size="20">
  </p>

  <p><?php _e("API Key:", 'menu-test' ); ?> 
    <input type="password" name="<?php echo $data_apikey; ?>" value="<?php echo $opt_val_apikey; ?>" size="20">
  </p>

  <p class="submit">
    <input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e('Save Changes') ?>" />
  </p>

</form>
</div>

