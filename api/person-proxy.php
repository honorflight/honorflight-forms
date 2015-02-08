<?php

function people($app){

  // Post stuff to api url with php curl 
  // http://stackoverflow.com/questions/9802788/call-a-rest-api-in-php
  // http://php.net/manual/en/book.curl.php
  // http://www.lornajane.net/posts/2011/posting-json-data-with-php-curl
  // $curl = curl_init("http://honorflight-rails.dev/api/v1/people");
  $apikey = get_option('apikey');
  $data_string = $app->request->getBody(); 
  $ch = curl_init("http://honorflight-rails.dev/api/v1/people");                                                                      
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);                                                                  
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
      "X_ADMIN_APIKEY: $apikey",                                                                        
      'Content-Type: application/json',                                                                                
      'Content-Length: ' . strlen($data_string))                                                                       
  );                                                                                                                   
   
  $result = curl_exec($ch);
  echo $result;

}


?>