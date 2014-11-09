RESTful API Setup
=================

Follow these instructions to set up the RESTful API that helps connect Angular with Salesforce.

1. Install the [WP Slim Framework](https://github.com/Botnary/wp-slim-framework) plugin into WordPress.

2. Go to the WordPress admin panel (which is probably located at hostname/wp-admin).

	a. Under "Plugins", make sure WP Slim Framework is activated.
	b. Under "Settings -> Slim Framework", set the base path to `api/`.  Click "Update".
	c. Under "Settings -> Permalinks", choose any of the options other than default (for example, "Post name").  Click "Save changes".

3. Create a file called "salesforce.ini" in this directory.  Put in the following content:

	; Salesforce Login Credentials Here

	[authorization]
	username = "xxx"
	password = "xxx"
	token = "xxx"

Ask Jancel for the credentials (we don't want to check them into source control).

3. You should now be able to visit the following URL and see JSON data from Salesforce:

4.
Enable Mod Rewrite on Apache server
In termminal
sudo a2enmod rewrite
service apache2 restart #this is for ubuntu restart apache in general
	http://hostname/path/to/wordpress/api/sforce/Contact?fields%5B%5D=FirstName&fields%5B%5D=LastName&fields%5B%5D=Phone
