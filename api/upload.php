<?php

ini_set("display_errors", 1);

require_once("functions.php");

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_FILES["file"])) {


    $file = $_FILES["comic"];

  $fileName = $file["name"];
  $fileTmpName = $file["tmp_name"];
  $fileSize = $file["size"];
  $fileError = $file["error"];
  $fileType = $file["type"];

  $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);

  $allowed = ["jpg", "jpeg", "png"];
  if(in_array($fileExtension, $allowed)) {

    if($fileSize < 2000000) {
      if($fileError === 0) {
        $destination = "data/comics/".$fileName;
        $source = $fileTmpName;

        if(move_uploaded_file($source, $destination)) {
          $imageSource = "data/comics/".$fileName;         
          sendJSON($imageSource, 200);
        }
      } else {
        $error = ["error" => "Something went wrong when uploading image."];
        sendJSON($error, 400);
      }
    } else {
      $error = ["error" => "The file you uploaded is to big."];
      sendJSON($error, 413);
    }
  } else {
        $error = ["error" => "We only allow JPG, JPEG & PNG files."];
        sendJSON($error, 405);
    }
  }
}


?>