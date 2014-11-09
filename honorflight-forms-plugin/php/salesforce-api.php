<?php
/**
 * Created by PhpStorm.
 * User: mattlodes
 * Date: 11/7/14
 * Time: 7:15 PM
 */

$records = array();
$records[0] = new stdClass();
//account
$records[0]->FIRST_NM__c = $data["firstName"];
$records[0]->LAST_NM__c = $data["lastName"];
$records[0]->MIDDLE_NM__C = $data["middleName"];
$records[0]->NICK_NM__c = $data["nickName"];
$records[0]->HOME_PHONE_NBR__c = $data["homePhone"];
$records[0]->CELL_PHONE_NBR__c = $data["cellPhone"];
$records[0]->EMAIL_ADDRESS_TXT__c = $data["email"];
$records[0]->OCCUPATION_NM__c = $data["occupation"];
$records[0]->CELL_PHONE_NBR__c = $data["cellPhone"];
$records[0]->BIRTH_DT__c = $data["dateOfBirth"];
//this needs to be put in
$records[0]->VETERAN = $data["veteranName"];


//guardian
$records[0]->SERVICE_BRACH_NM__c = $data["branch"];
$records[0]->MILITARY_SERVICE_LOCATION__c = $data["whereServed"];
$records[0]->MILITARY_SERVICE_DATE_TXT__c = $data["whenServed"];

//address
$records[0]->ADDRESS_LINE_1_TXT__c = $data["address"];
$records[0]->CITY_NM__c = $data["city"];
$records[0]->STATE_CD__c = $data["state"];
$records[0]->ZIP_CD__c = $data["zip"];



//



?>