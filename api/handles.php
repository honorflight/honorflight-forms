<?php

//API Routing Handles
require_once("vars.php");
require_once('reference_data.php');
// Sumitting info to salesforce
//In the form {msg:"Message you need", err:"Anny errors that happened "}
function submit($form_name){
    require_once "vars.php";
    header("Slim: submit");
    $toReturn = array("msg"=>"", "err"=>"");
    header("Content-Type: application/json");
    $form = explode("_", $form_name);
    $model = $form[0];
    $param = $form[1];

    if(!empty($model) && !empty($param)){
      $toReturn["msg"] = $form_name;
      echo json_encode($toReturn);
    }else{
      header("HTTP/1.1 400 Bad Request");
      $toReturn["err"] = "Need a form name. you sent $form_name";
      echo json_encode($toReturn);
    }

}

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
