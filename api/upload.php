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
      if($fileSize < 200000000) {
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
          // send_JSON($fileError);
          switch ($file["error"]) {
        case UPLOAD_ERR_OK:
            // File uploaded successfully
            // Your processing code here
            echo "File uploaded successfully.";
            break;
        case UPLOAD_ERR_INI_SIZE:
          // $upload_max_filesize = 10M //måste gå in och öka i php.ini - filen
            echo "The uploaded file exceeds the upload_max_filesize directive in php.ini.";
            break;
        case UPLOAD_ERR_FORM_SIZE:
            echo "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form.";
            break;
        case UPLOAD_ERR_PARTIAL:
            echo "The uploaded file was only partially uploaded.";
            break;
        case UPLOAD_ERR_NO_FILE:
            echo "No file was uploaded.";
            break;
        case UPLOAD_ERR_NO_TMP_DIR:
            echo "Missing a temporary folder.";
            break;
        case UPLOAD_ERR_CANT_WRITE:
            echo "Failed to write file to disk.";
            break;
        case UPLOAD_ERR_EXTENSION:
            echo "A PHP extension stopped the file upload.";
            break;
        default:
            echo "Unknown error occurred.";
    }
          $error = ["error" => "Something went wrong when uploading image."];
          send_JSON($error, 400);
        }
      } else {
        $error = ["error" => "The file you uploaded is to big."];
        send_JSON($error, 413);
      }
      } else {
        send_JSON($file);
        $error = ["error" => "We only allow JPG, JPEG & PNG files."];
        send_JSON($error, 405);
       }
    }else{
      send_JSON($file);
$erica = ["message" => "Här blir det fel"];
send_JSON($erica);
    }
}


?>