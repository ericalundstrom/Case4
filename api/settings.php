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
                            $oldUsername = $user["personal"]["username"];
                            $newUsername = $input["username"];
                            $user["personal"]["username"] = $input["username"];

                            $comics = $user["comics"];
                            foreach ($user["comics"] as &$comic) {
                                $comic["author"] = $input["username"];
                            }
                        }

                        foreach ($users as &$otherUserGroup) {
                            foreach ($otherUserGroup as &$otherUser) {
                                // Update following
                                $followingKey = array_search($oldUsername, $otherUser["personal"]["following"]);
                                if ($followingKey !== false) {
                                    $otherUser["personal"]["following"][$followingKey] = $input["username"];
                                }

                                // Update followers
                                $followersKey = array_search($oldUsername, $otherUser["personal"]["followers"]);
                                if ($followersKey !== false) {
                                    $otherUser["personal"]["followers"][$followersKey] = $input["username"];
                                }
                            }
                        }

                        updateAuthorInComments($oldUsername, $newUsername, $user["personal"]["username"]);


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
                    
                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                    send_JSON($user);
                }
            }
            }
        }


}


function updateAuthorInComments($oldUsername, $newUsername, $currentUsername) {
    $commentsFilename = "data/community.json";
    $comments = json_decode(file_get_contents($commentsFilename), true);

    foreach ($comments as &$post) {
        if ($post["author"] == $oldUsername) {
            $post["author"] = $newUsername;

            foreach ($post["comments"] as &$comment) {
                // var_dump($comment["author"]);
                // var_dump($comment);
                // var_dump($newUsername);
                // var_dump($currentUsername);
                // Check if the comment author is not the current user
                if ($comment["author"] === $oldUsername) {
                    $comment["author"] = $newUsername;
                }
            }
        }
        foreach($post["comments"] as &$comment){
            if ($comment["author"] === $oldUsername) {
                $comment["author"] = $newUsername;
            }
        }
    }

    file_put_contents($commentsFilename, json_encode($comments, JSON_PRETTY_PRINT));
}




?>