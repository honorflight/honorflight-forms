<?php

define("SALESFORCE_TOOLKIT_ROOT", dirname(__FILE__)."/../../Force.com-Toolkit-for-PHP/");
require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

$sforce_connection = new SforceEnterpriseClient();
$sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");

$query = "SELECT Id, WAR_NAME__c from WAR__c";
$result;$error;
try {
  // var_dump($sforce_connection);
  // var_dump($sforce_cfg);
  error_log("Trying to query Salesforce");
  // error_log("SalesforceCFG: ".print_R($sforce_cfg, true));
  error_log("User: ".get_option('sforce_api_user'));
  // error_log("Pass.token: ".get_option('sforce_api_password').get_option('sforce_api_secret'));
  $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
  $response = $sforce_connection->query($query);
  error_log("Got a response from salesforce: ".print_R($response, true));
} catch (Exception $e) {
  header("HTTP/1.1 400 Bad Request");
  error_log($e);
  echo $e;
}


// $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
// var_dump($sforce_connection);
// // $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
// $sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);
// error_log("Successfully logged into salesforce");

// require "vars.php";

// class Force 
// {
//   var $message;
//   var $connection;

//   function __construct() {
//     // Initialize the salesforce API
//     $this->message = "From the world!";

//     $this->connection = new SforceEnterpriseClient();
//     $this->connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");

//     $cfg = parse_ini_file("../salesforce.ini");
//     global $sforce_api_user;
//     // $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
//     error_log("global sforce user: $sforce_api_user");
//     error_log(sprintf("Attempting to login with user and pass: %s and %s", $sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]));
//     // $this->connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);
//     error_log("Successfully logged into salesforce");


//     // Salesforce configuration
//     // $sforce_cfg = parse_ini_file("salesforce.ini");
//     error_log($connection);
//     $this->connection = $connection;
//   }

//   /*
//     Establish connection to salesforce api
//   */
//   function wars() {
//     // var $config = parse_ini_file("../salesforce.ini");
//     // $this->$connection = new SforceEnterpriseClient();
//     // $this->$connection->createConnection("WSDL/wsdl.jsp.xml");
//     // return $this->$connection;
//     $response; $error;
//     $query = 'SELECT Id, WAR_NAME__c from WAR__c';
//     try {
//       error_log("Querying Salesforce with: ".$query);
//       var_dump($this->connection);
//       var_dump($sforce_connection);
//       // $response = $this->connection->query($query);
//       error_log("Successfully Queried Salesforce");
//       $response = "wars";
//      } catch(Exception $e) {
//       // $error = "error";
//        // In production, do not echo the error here. Put it in the server's error log instead.
//        //echo $e;
//       error_log("Query failed");
//       $error = sprintf("Could not query %s beacause of %s", $query, $e);
//      }

//     if(!empty($response)){
//       $response = $response;
//     }else{
//       $response = $error;
//     }

//     return $response;
//   }



//   /* 
//     Map all known reference data types to a method dynamicly
//     created and return that data from salesforce.  Restrict
//     to known types for security
//   */
//   function hello() {
//     return $this->message;
//   }
// }


?>
