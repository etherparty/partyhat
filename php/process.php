<?php
 
    $to = "pixininja@csmthemes.com";  //Change email here
    $from = $_REQUEST['email']; 
    $name = $_REQUEST['name']; 
    $headers = "From: $from"; 
    $subject = "New Message"; 
 
    $fields = array(); 
    $fields{"name"} = "name";	
    $fields{"email"} = "email"; 
    $fields{"message"} = "message";
 
    $body = "Message details:\n\n"; foreach($fields as $a => $b){   $body .= sprintf("%20s: %s\n",$b,$_REQUEST[$a]); }
 
    $send = mail($to, $subject, $body, $headers);
 
?>