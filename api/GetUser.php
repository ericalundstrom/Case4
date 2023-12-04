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

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET["user"])) {

        $username = $_GET["user"];
        $title = trim($username, '"');
        
        foreach($users as $user){
            // send_JSON($users);
            // $userPersonal = $user["personal"];
            foreach($user as $part){

                $userPersonal = $part["personal"];
                $userName = $userPersonal["username"];
                // var_dump($userName);
                // var_dump($title);
               
                if ($userName === $title) {
    
                    send_JSON($user);
                }
            };


        // send_JSON($_GET["user"]);
        }
        $error = ["error" => "Fel fel"];
        send_JSON($error, 400);
    }else{
        $error = ["error" => "Fel nyckel"];
        send_JSON($error, 400);
    }
}else{
    $error = ["error" => "Fel här"];
    send_JSON($error, 400);
}

?>