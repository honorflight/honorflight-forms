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
  echo "TRUE";
} else {
  die("No script kiddies please!");
}



?>