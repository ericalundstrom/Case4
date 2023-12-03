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
        
        foreach($users as $user){
            // send_JSON($users);
            // $userPersonal = $user["personal"];
            foreach($user as $part){

                // send_JSON($part);
                $userPersonal = $part["personal"];
                $userName = $userPersonal["username"];
                // send_JSON($userPersonal["username"]);
                // send_JSON($username);
                if ($userName === $username) {
                    
                    // if (in_array($recipe, $user['idMeal'])) {  // if the recipe exist in the users favourites
                    //     send_JSON(true);
                    // }else{
                    //     send_JSON(false); // if it doesn't
                    // }
    
                    send_JSON($user);
                }else{
                    $error = ["error" => "Hittar ingen user"];
                    send_JSON($user, 400);
                }
            };


        send_JSON($_GET["user"]);
        }
    }
}else{
    $error = ["error" => "Fel här"];
    send_JSON($error);
}

?>