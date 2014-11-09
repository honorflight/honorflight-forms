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
//url request, vetren, guardian, or volunteer, simply add tables to array to get them
$request = array("Veteran"=>array("SHIRT_SIZE__c",
                                  "SERVICE_BRANCH__c",
                                 "SERVICE_RANK__c",
                                 'WAR__c',
                                 "SERVICE_AWARD__c",
                                "MEDICAL_CONDITION_TYPE__c",
                                 "MEDICAL_CONDITION__c" ),

                 "Guardian"=>array("SHIRT_SIZE__c",
                                    "SERVICE_BRANCH__c",
                                    "WAR__c"));

//Maps a table name to the fields of that table. field ID is implicit
$accessible_objects = array("SHIRT_SIZE__c"=>array("SHIRT_SIZE_CD__c"),"SERVICE_BRANCH__c"=>array("SERVICE_BRANCH_NAME__c"),
                            "SERVICE_RANK__c"=>array("NAME"),
                             "WAR__c"=>array("WAR_NAME__c"),
                             "SERVICE_AWARD__c"=>array("SERVICE_AWARD_NM__c"),
                             "MEDICAL_CONDITION_TYPE__c"=>array("Name"),
                             "MEDICAL_CONDITION__c"=>array("Name"),
                             );

function getReference($requestType){
  //echo "$requestType, $requestField";
  global $request, $accessible_objects, $sforce_connection;

  if(array_key_exists($requestType, $request)){
    //Tables
    $safe_objects = $request[$requestType];
    //Fields of those tables
    $safe_fields = array_map(function ($safe_object) use(&$accessible_objects){
                                  return $accessible_objects[$safe_object];
                                }, $safe_objects);
    //field index
    $i = 0;
    $responses = array();
    foreach($safe_objects as $safe_object){
      //always get the id
      $fieldlist = implode(",", $safe_fields[$i]);
      $fieldlist = (empty($fieldlist))? "id" : "id, ".$fieldlist;
      $query = sprintf("SELECT %s from %s", $fieldlist, addslashes($safe_object));
      $response;
      $error;
      try {
         $response = $sforce_connection->query($query);
       } catch(Exception $e) {
         // In production, do not echo the error here. Put it in the server's error log instead.
         //echo $e;
         $error = sprintf("Could not quere %s beacause of %s", $query, $e);
       }
      if(!empty($response)){
        $responses[$safe_object] = $response->records;
      }else{
        $responses[$safe_object] = $error;
      }
      $i++;
    }

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo json_encode($responses);

  } else {
    header("HTTP/1.1 400 Bad Request");
    echo $e;
    return;
  }

}
// $accessible_objects = array("SHIRT_SIZE__c");
// if (in_array($_GET["sobject_type"], $accessible_objects) && isset($_GET["fields"])) {
//   define("SALESFORCE_TOOLKIT_ROOT", "../../Force.com-Toolkit-for-PHP/");
//   ini_set('soap.wsdl_cache_enabled', '0');
//   require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";
//
//   /* Load sforce_cfg */
//   $sforce_cfg = parse_ini_file("../../api/salesforce.ini");
//
//   $sforce_connection = new SforceEnterpriseClient();
//
//   // $sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");
//   $sforce_connection->createConnection("../WSDL/wsdl.jsp.xml");
//
//   // $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
//   $sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);
//
//   $safe_fields = $_GET["fields"];
//   $safe_object = $_GET["sobject_type"];
//
//   // $query = sprintf("SELECT %s from %s", $fields_string, mysql_real_escape_string($_GET["sobject_type"]));
//   $query = "SELECT $safe_fields FROM $safe_object";
//
//   try {
//     $response = $sforce_connection->query($query);
//   } catch(Exception $e) {
//     header("HTTP/1.1 400 Bad Request");
//
//     // In production, do not echo the error here. Put it in the server's error log instead.
//     echo $e;
//     return;
//   }
//
//   header("Access-Control-Allow-Origin: *");
//   header("Content-Type: application/json");
//   echo json_encode($response->records);
// } else {
//   die("No script kiddies please!");
// }
//
//

 ?>
