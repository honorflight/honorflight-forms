<?php
/*
Description: To obtain reference data from SForce in a lazy way
Inputs: sobject_type=Contact (SalesForce), fields=id,name,etc
Optional: id=SFORCEOBJID (will return singular object)
Output: Json Array representation of the data
*/


/*
Let's restrict the objects that can be called from this file
*/
$accessible_objects = array("SHIRT_SIZE__c");
if (in_array($_GET["sobject_type"], $accessible_objects) && isset($_GET["fields"])) {
  define("SALESFORCE_TOOLKIT_ROOT", "../../Force.com-Toolkit-for-PHP/");
  ini_set('soap.wsdl_cache_enabled', '0');
  require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

  $sforce_cfg = parse_ini_file("../../api/salesforce.ini");
  /* Load sforce_cfg */
  // $sforce_cfg = array(
  //   "username" =>get_option('sforce_api_user'),
  //   "password" =>get_option('sforce_api_password'),
  //   "token" =>get_option('sforce_api_secret') 
  // );
  // define('SALESFORCE_CONFIG', $sforce_cfg);

  // // $sforce_cfg = parse_ini_file("salesforce.ini");


  $sforce_connection = new SforceEnterpriseClient();

  // $sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");
  $sforce_connection->createConnection("../WSDL/wsdl.jsp.xml");

  // $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
  $sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);

  $safe_fields = mysql_real_escape_string($_GET["fields"]);
  $safe_object = mysql_real_escape_string($_GET["sobject_type"]);

  // $query = sprintf("SELECT %s from %s", $fields_string, mysql_real_escape_string($_GET["sobject_type"]));
  $query = "SELECT $safe_fields FROM $safe_object";

  try {
    $response = $sforce_connection->query($query);
  } catch(Exception $e) {
    header("HTTP/1.1 400 Bad Request");

    // In production, do not echo the error here. Put it in the server's error log instead.
    echo $e;
    return;
  }
  
  header("Content-Type: application/json");
  echo json_encode($response->records);
} else {
  die("No script kiddies please!");
}



?>