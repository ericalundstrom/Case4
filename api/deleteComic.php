<?php

// require_once("functions.php");

// $filename = "data/users.json";
// $directory = "data";

// if (!file_exists($directory)) { // if no directory, create it
//     mkdir($directory, 755);
// }

// if (!file_exists($filename)) { // if no file, create it
//     file_put_contents($filename, "[]");
// }

// $users = json_decode(file_get_contents($filename), true);
// $input = json_decode(file_get_contents("php://input"), true);

// if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    
//     if (isset($input["title"], $input["author"])) {


//         foreach ($users as &$user) {
//             foreach ($user as &$part) {
//                 $comics = $part["comics"];

//                 foreach($comics as &$comic){

//                     $author = $comic["author"];
//                     $title = $comic["title"];
//                     if ($title === $input["title"] && $author === $input["author"]) {
//                         send_JSON($comic);
//                     }       

//                 }
//             }
//         }
//     }
// }



// require_once("functions.php");

// $filename = "data/users.json";
// $directory = "data";

// if (!file_exists($directory)) { // if no directory, create it
//     mkdir($directory, 755);
// }

// if (!file_exists($filename)) { // if no file, create it
//     file_put_contents($filename, "[]");
// }

// $users = json_decode(file_get_contents($filename), true);
// $input = json_decode(file_get_contents("php://input"), true);

// if ($_SERVER["REQUEST_METHOD"] == "DELETE") {

//     if (isset($input["title"], $input["author"])) {

//         foreach ($users as &$user) {
//             foreach ($user as &$part) {
//                 $comics = &$part["comics"] // Use a reference to modify the original array

//                 foreach ($key => &$comic) {
//                     $author = $comic["author"];
//                     $title = $comic["title"];

//                     if ($title === $input["title"] && $author === $input["author"]) {
//                         // Remove the matching comic
//                         unset($comics[$key]);
//                         $comics = array_values($comics); // Reset array keys
//                         send_JSON($comic);

//                         // Update the users file with the modified data
//                         file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
//                         return; // Exit the script after successful deletion
//                     }
//                 }
//             }
//         }
//     }
// }


require_once("functions.php");

$filename = "data/users.json";
$directory = "data";

if (!file_exists($directory)) { // if no directory, create it
    mkdir($directory, 755);
}

if (!file_exists($filename)) { // if no file, create it
    file_put_contents($filename, "[]");
}

$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    
    if (isset($input["title"], $input["author"])) {


        foreach ($users as &$user) {
            foreach ($user as &$part) {
                // Check if $part has "comics" key and it is an array
                if (isset($part["comics"]) && is_array($part["comics"])) {
                    $comics = &$part["comics"];
    
                    foreach ($comics as $key => $comic) {
                       
                    
                        $author = $comic["author"];
                        $title = $comic["title"];
    
                        if ($title === $input["title"] && $author === $input["author"]) {
                            // Remove the matching comic using array_splice
                            array_splice($comics, $key, 1);
    
                            // Update the users file with the modified data
                            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                            send_JSON($users); // Exit the script after successful deletion
                        }
                    }
                }
            }
        
        }
    }
}



?>


