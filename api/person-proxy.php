<?php

function route($app, $url_array){
  $apikey = get_option('apikey');
  $apiurl = get_option('apiurl');

  $curl = $apiurl."/".implode("/", $url_array);
  $data = $app->request->getBody();
  $method = $_SERVER['REQUEST_METHOD'];

  $ch = curl_init($curl);                                                                      
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);    
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data);                                                                  
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
      "X_ADMIN_APIKEY: $apikey",                                                                        
      'Content-Type: application/json',
      'Content-Length: ' . strlen($data))                                                                       
  );                                                                                                                   
   
  // var_dump($ch);
  $result = curl_exec($ch);

  $app->response->headers->set('Content-Type', 'application/json');
  if ($result) {
    $app->response->setStatus(200);
    $app->response->setBody($result);
  } else {
    $app->response->setStatus(500);
    $app->response->setBody($result);
  }
}
?>