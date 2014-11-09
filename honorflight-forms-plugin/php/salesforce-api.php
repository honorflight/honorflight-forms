<?php
/**
 * Created by PhpStorm.
 * User: mattlodes
 * Date: 11/7/14
 * Time: 7:15 PM
 */

// [POST]       /path/to/api/testmethod/submit 
function testmethod($app){
    $response = array("hello" => "world", "body" => json_decode($app->request->getBody()));

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json");
    echo json_encode($response);

}

define("SALESFORCE_TOOLKIT_ROOT", "../../Force.com-Toolkit-for-PHP/");
ini_set('soap.wsdl_cache_enabled', '0');
require_once SALESFORCE_TOOLKIT_ROOT . "soapclient/SforceEnterpriseClient.php";

/**
 * @param $data : JSON Guardian data
 * @param $sforceClient : SforceEnterpriseClient
 *
 * @return String AccountID
 */
function contactForm($data)
{

    /* Load sforce_cfg */
    $sforce_cfg = parse_ini_file("../../api/salesforce.ini");

    $sforce_connection = new SforceEnterpriseClient();

    // $sforce_connection->createConnection(SALESFORCE_TOOLKIT_ROOT . "soapclient/enterprise.wsdl.xml");
    $sforce_connection->createConnection("../WSDL/wsdl.jsp.xml");

    // $sforce_connection->login(get_option('sforce_api_user'), get_option('sforce_api_password').get_option('sforce_api_secret'));
    $sforce_connection->login($sforce_cfg["username"], $sforce_cfg["password"].$sforce_cfg["token"]);


    $newAccount = array();
    $newAccount[0] = new stdClass();
// account
    $newAccount[0]->Name = "Unique Key Here";              // Account Primary Key : Generate unique key
    $newAccount[0]->FIRST_NM__c = $data["firstName"];      // Text(50)
    $newAccount[0]->LAST_NM__c = $data["lastName"];        // Text(50)
    $newAccount[0]->MIDDLE_NM__C = $data["middleName"];    // Text(50)
    $newAccount[0]->NICK_NM__c = $data["nickName"];        // Text(50)
    $newAccount[0]->HOME_PHONE_NBR__c = $data["homePhone"];// Phone
    $newAccount[0]->CELL_PHONE_NBR__c = $data["cellPhone"]; // Phone
    $newAccount[0]->EMAIL_ADDRESS_TXT__c = $data["email"];  // Email
    $newAccount[0]->OCCUPATION_NM__c = $data["occupation"]; // Text(50)
    $newAccount[0]->BIRTH_DT__c = $data["dateOfBirth"];     // Date : YYYY-MM-DD
// $newAccount[0]->address_id__c = "a0aj0000000U7v0AAC";  // Lookup(Address) Ex: "a0aj0000000U7v0AAC"

// this needs to be put in
    $newAccount[0]->VETERAN = $data["veteranName"];


    $newGuardian = array();
    $newGuardian[0] = new stdClass();

// guardian
    $newGuardian[0]->SERVICE_BRACH_NM__c = $data["branch"];
    $newGuardian[0]->MILITARY_SERVICE_LOCATION__c = $data["whereServed"];
    $newGuardian[0]->MILITARY_SERVICE_DATE_TXT__c = $data["whenServed"];

    $newAddress = array();
    $newAddress[0] = new stdClass();
// address
    $newAddress[0]->ADDRESS_LINE_1_TXT__c = $data["address"];
    $newAddress[0]->CITY_NM__c = $data["city"];
    $newAddress[0]->STATE_CD__c = $data["state"];
    $newAddress[0]->ZIP_CD__c = $data["zip"];


    $response = $sforce_connection->create($newAddress, 'ADDRESS');
    print_r($response);

    $accountID = $response[0]->id;
    $newAccount[0]->address_id__c = $response[0]->id;




    return $accountID;
}
?>