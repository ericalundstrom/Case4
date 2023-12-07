<?php
require_once("functions.php");

$filename = "data/users.json";
$directory = "data";

// if(!file_exists("data/pictures/pfp")){ // if no directory, create it
//     mkdir("data/pictures/pfp", 755);
// }
if(!file_exists($filename)){ // if no file, create it
    file_put_contents($filename, "[]");
}



$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if($_SERVER["REQUEST_METHOD"] == "PATCH"){


    if (isset($input["user"])) { /// find the current user
        
        foreach ($users as &$userGroup) {
            foreach ($userGroup as &$user) {
                if ($user["personal"]["username"] == $input["user"]) {
                    // don't send the password
                    

                    if (isset($input["email"])) {
                        if ($input["email"] !== "") {
                            $user["personal"]["email"] = $input["email"];
                        }
                    }


                    if (isset($input["username"])) {
                        if ($input["username"] !== "") {
                            $user["personal"]["username"] = $input["username"];
                        }
                    }

                    if (isset($input["currentPassword"])) {

                        if ($input["currentPassword"] !== "" && $input["newPassword"] !== "") {
                            # code...
                            if ($user["personal"]["password"] === $input["currentPassword"]) {
                                
                                if ($input["newPassword"] === $input["repeatPassword"]) {
                                    $user["personal"]["password"] = $input["newPassword"];
                                }else{
                                    $message = ["message" => "You must write the same password"];
                                    send_JSON($message, 400);
                                }
                            }else{
                                $message = ["message" => "You must write your current password"];
                                send_JSON($message, 400);
                            }
                        }
                        
                    }
                    
                }
            }
        }

        file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
        send_JSON($users);
    }

}



?>