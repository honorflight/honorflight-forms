Honor Flight Forms Plugin for GSLHonorflight.org
=========================

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/honorflight/honorflight-forms?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Simple plugin. Check it out and get to work :D

* To build from local *nix, run ./build.sh
* To upload from other OS'es, zip the directory contents (*not recommended*)

Wordpress Installation
===========================

1. Install wp-slim-framework [Our Forked Slim Framework Plugin](https://github.com/jancel/wp-slim-framework) --Follow ALL Installation instructions (include activating)
2. Browse to Settings -> Slim Framework and set the url to /api
2. Upload the Theme replacement files (header and footer.php) in theme_updates to their honorflightstl theme
3. Compile plugin
4. Install plugin through uploading zip file in build/
5. Configure plugin by browsing to Settings -> Honor Flight Options and inputting the proper APIKEY
6. Add page called "Application" with content where you would like the form to live [[vetapp]]