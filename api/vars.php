<?php
// This file should be included into the rest of the API.
// Contains constant declarations.


// Customize this variable as needed
define("SALESFORCE_TOOLKIT_ROOT", "wp-content/plugins/honorflight-form/Force.com-Toolkit-for-PHP/");

require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

$sforce_cfg = parse_ini_file("salesforce.ini");

$sforce_connection = new SforceEnterpriseClient();
$sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");
$sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);

$sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
// $sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);

?>
