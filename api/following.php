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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $currentUser = $input["currentUser"];
    $username = $input["user"];

    foreach($users as &$user){        

        foreach($user as &$part){

            $userPersonal = &$part["personal"];
            $userName = $userPersonal["username"];           

            // Followers
            if ($userName === $username) {
                if (!in_array($currentUser, $userPersonal["followers"])) {
                    $userPersonal["followers"][] = $currentUser;
                }else {
                    $message = ["message" => "You already follow this person"];
                    send_JSON($message, 400);
                }
                // $userPersonal["followers"][] = $currentUser;
            }

            // Following
            if ($currentUser === $userName) {
                
                $userPersonal["following"][] = $username;
            }
                        
        };

    }

    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
    send_JSON($users);
    
}


// if ($_SERVER["REQUEST_METHOD"] == "DELETE") {

//     $currentUser = $input["currentUser"];
//     $username = $input["user"];

//     foreach($users as &$user){        

//         foreach($user as &$part){

//             $userPersonal = &$part["personal"];
//             $userName = $userPersonal["username"];           

//             // Followers
//             if ($userName === $username) {
//                 if (!in_array($currentUser, $userPersonal["followers"])) {
//                     $userPersonal["followers"][] = $currentUser;
//                 }else {
//                     $message = ["message" => "You already follow this person"];
//                     send_JSON($message, 400);
//                 }
//                 // $userPersonal["followers"][] = $currentUser;
//             }

//             // Following
//             if ($currentUser === $userName) {
                
//                 $userPersonal["following"][] = $username;
//             }
                        
//         };

//     }

//     file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
//     send_JSON($users);
// }

// ...

if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    
    $currentUser = $input["currentUser"];
    $username = $input["user"];

    foreach ($users as &$user) {
        foreach ($user as &$part) {
            $userPersonal = &$part["personal"];
            $userName = $userPersonal["username"];           

            // Followers
            if ($userName === $username) {
                // Check if the current user is in the followers list
                $followerIndex = array_search($currentUser, $userPersonal["followers"]);
                if ($followerIndex !== false) {
                    // Remove the current user from the followers list
                    unset($userPersonal["followers"][$followerIndex]);
                    $userPersonal["followers"] = array_values($userPersonal["followers"]); // Reset array keys
                } 
            }

            // Following
            if ($currentUser === $userName) {
                // Check if the user to unfollow is in the following list
                $followingIndex = array_search($username, $userPersonal["following"]);
                if ($followingIndex !== false) {
                    // Remove the user to unfollow from the following list
                    unset($userPersonal["following"][$followingIndex]);
                    $userPersonal["following"] = array_values($userPersonal["following"]); // Reset array keys
                }
            }
        }
    }

    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
    send_JSON($users);
}





?>
