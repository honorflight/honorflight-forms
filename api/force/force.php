<?php

define("SALESFORCE_TOOLKIT_ROOT", dirname(__FILE__)."/../../Force.com-Toolkit-for-PHP/");
ini_set('soap.wsdl_cache_enabled', '0');
require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

$sforce_connection = new SforceEnterpriseClient();
// $sforce_connection->createConnection("WSDL/wsdl.jsp.xml");
$sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");

function query_salesforce($object_name){
  global $sforce_connection;
  
  // All of the reference data queries
  $queries = array();
  $queries["wars"]="SELECT id, WAR_NM__c from WAR__c";
  $queries["shirt_sizes"] = "SELECT Id, Name, SHIRT_SIZE_CD__c from SHIRT_SIZE__c";
  $queries["service_awards"] = "SELECT Id, SERVICE_AWARD_NM__c from SERVICE_AWARD__c";
  $queries["relationship_types"] = "SELECT Id, RELATIONSHIP_TYPE_NM__c from RELATIONSHIP_TYPE__c";
  $queries["service_branches"] = "SELECT Id, SERVICE_BRANCH_NM__c from SERVICE_BRANCH__c";

  $query = $queries[$object_name];

  // Array here will map back to json 'name' field
  $names = array();
  $names["shirt_sizes"] = "SHIRT_SIZE_CD__c";
  $names["wars"] = "WAR_NM__c"; 
  $names["service_awards"] = "SERVICE_AWARD_NM__c"; 
  $names["relationship_types"] = "RELATIONSHIP_TYPE_NM__c";
  $names["service_branches"] = "SERVICE_BRANCH_NM__c";
  
  // $query = sprintf("SELECT %s from %s", "id, RELATIONSHIP_TYPE_NM__c", addslashes("RELATIONSHIP_TYPE__c"));
  $result;$error;
  try {
    $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
    $response = $sforce_connection->query($query);

    $records = array();
    foreach($response->records as $record){
      $new_record = new stdClass;
      $new_record->id = $record->Id;

      // Map special (sforce retarded name) to name for json
      $new_record->name = $record->$names[$object_name];

      array_push($records, $new_record);
    }

    echo json_encode($records);
    // CAST to War(id, name)
  } catch (Exception $e) {
    header("HTTP/1.1 400 Bad Request");
    error_log($e);
  }

}

?>
