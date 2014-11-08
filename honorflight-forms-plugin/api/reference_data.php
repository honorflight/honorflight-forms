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
$accessible_objects = array("Contact", "SERVICE_BRANCH__c");
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
  $sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");

  // $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
  $sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);

  $safe_fields = array_map("mysql_real_escape_string", $_GET["fields"]);

  // var_dump($_GET["fields"]);
  var_dump($safe_fields);

  // $fields_string = explode(",",$_GET["fields"]);

  // $fields_string = implode(", ", $safe_fields);
  
  // var_dump($fields_string);

  // $query = sprintf("SELECT %s from %s", $fields_string, mysql_real_escape_string($_GET["sobject_type"]));
  $query = "SELECT C.Id, C.SHIRT_SIZE_CD__c FROM SHIRT_SIZE__c C";

  try {
    $result = $sforce_connection->query($query);

    for($i = 0; $i < count($result->records); $i++) {
      var_dump($result->records[$i]); 
    }
  } catch(Exception $e) {
    header("HTTP/1.1 400 Bad Request");

    // In production, do not echo the error here. Put it in the server's error log instead.
    echo $e;
    return;
  }
  

  echo "TRUE";
} else {
  die("No script kiddies please!");
}



?>