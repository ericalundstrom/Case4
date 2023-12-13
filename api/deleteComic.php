<?php

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
                $comics = $part["comics"];

                foreach($comics as &$comic){

                    $author = $comic["author"];
                    $title = $comic["title"];
                    if ($title === $input["title"] && $author === $input["author"]) {
                        send_JSON($comic);
                    }       

                }
            }
        }
    }
}

?>