<?php

ini_set("display_errors", 1);

require_once("functions.php");

// function send_JSON ($data, $code = 200){
//   header("Content-Type: application/json");
//   http_response_code($code);
//   echo json_encode($data);
//   exit();
// }

if ($_SERVER["REQUEST_METHOD"] === "POST"){

  if(isset($_FILES["comic"])) {
    

    $file = $_FILES["comic"];

    $fileName = $file["name"];
    $fileTmpName = $file["tmp_name"];
    $fileSize = $file["size"];
    $fileError = $file["error"];
    $fileType = $file["type"];

    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

    $allowed = ["jpg", "jpeg", "png", "image/jpg","JPG"];

    if(in_array($fileExtension, $allowed)) {
      if($fileSize < 2000000) {
        if($fileError === 0) {
       
          $destination = "data/comics/".$fileName;
          $source = $fileTmpName;

          if(move_uploaded_file($source, $destination)) {
            $imageSource = "data/comics/".$fileName;   
            $erica = ["erica" => "flyttad"];
            send_JSON($destination);      
            send_JSON($imageSource);
          }
        } else {
          send_JSON($fileError);
          $error = ["error" => "Something went wrong when uploading image."];
          send_JSON($error, 400);
        }
      } else {
        $error = ["error" => "The file you uploaded is to big."];
        send_JSON($error, 413);
      }
      } else {
        $error = ["error" => "We only allow JPG, JPEG & PNG files."];
        send_JSON($error, 405);
       }
    }
}


?>