Honor Flight Forms Plugin for GSLHonorflight.org
=========================

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/honorflight/honorflight-forms?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Simple plugin. Check it out and get to work :D

* To build from local *nix, run ./build.sh
* To upload from other OS'es, zip the directory contents (*not recommended*)

Wordpress Installation
===========================

1. Install wp-slim-framework [Our Forked Slim Framework Plugin](https://github.com/jancel/wp-slim-framework) --Follow ALL Installation instructions (include activating)
1. Browse to Settings -> Slim Framework and set the url to /api
2. Upload the Theme replacement files (header and footer.php) in theme_updates to their honorflightstl theme
3. Compile plugin (./build.sh)
4. Install plugin through uploading zip file in build/
5. Configure plugin by browsing to Settings -> Honor Flight Options and inputting the proper APIKEY (from your admin user in the RAILS app) & APIURL (APIURL will depend on how you are running the RAILS app ROOT_URL/api/v1)
6. Add page called "Application" with content where you would like the form to live [[vetapp]]

Local Development (Front-end)
============================

*** Hint: If you map wordpress to port 80 for your front end development, you should have to make no more changes

1. Install local Wordpress (default Wordpress will work)
2. Install plugin via "Wordpress Installation" above (steps for Slim, and Plugin install/configuration)
3. Your front end development is done from the forms/ directory
  1. Run grunt serve to develop (on localhost:9001)
  2. This should use your wordpress installation to hit the rails api
4. OPTIONALLY: If you chose not to do the above with wordpress, you can modify the Gruntfile to proxy requests directly to your rails app.  You will then have to add the X_ADMIN_APIKEY, CONTENT_TYPE and ACCEPT headers to all requests
