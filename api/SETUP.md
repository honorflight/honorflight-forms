RESTful API Setup
=================

Follow these instructions to set up the RESTful API that helps connect Angular with Salesforce.

1. Install the [WP Slim Framework](https://github.com/Botnary/wp-slim-framework) plugin into WordPress.

2. Go to the WordPress admin panel (which is probably located at hostname/wp-admin).

	a. Under "Plugins", make sure WP Slim Framework is activated.
	b. Under "Settings -> Slim Framework", set the base path to `api/`.  Click "Update".
	c. Under "Settings -> Permalinks", choose any of the options other than default (for example, "Post name").  Click "Save changes".

3. Go to Wordpress Admin 
	a. Under "Plugins", make sure Honorflight Forms Plugin is activated.
	b. Under "Settings -> Honorflight Forms Plugin", set and save the APIKEY 