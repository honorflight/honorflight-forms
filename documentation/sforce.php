<?php
/**
 * This is the controller file.  Put code here to help Angular
 * talk to the Salesforce backend.
 */

function sforce_get($model){
	require_once "vars.php";

	// Convert field parameter into comma-delimited list
	$safe_fields = array_map("mysql_real_escape_string", $_GET["fields"]);
	$fields_string = implode(", ", $safe_fields);

	// Create the query string
	$query = sprintf("SELECT Id, %s from %s", $fields_string, mysql_real_escape_string($model));

	// Call Salesforce
	try {
		$response = $sforce_connection->query($query);
	} catch(Exception $e) {
		header("HTTP/1.1 400 Bad Request");

		// In production, do not echo the error here. Put it in the server's error log instead.
		echo $e;
		return;
	}

	// Print the response
	header("Content-Type: application/json");
	echo json_encode($response->records);
}

?>
