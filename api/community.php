<?php
require_once("functions.php");
$filename = "data/community.json";

$directory = "data";
if(!file_exists("data")){ // if no directory, create it
    mkdir($directory, 755);
}
if(!file_exists($filename)){ // if no file, create it
    file_put_contents($filename, "[]");
}

$communityPost = json_decode(file_get_contents($filename), true);
$post = json_decode(file_get_contents("php://input"), true);
$time=time();
$timestamp = date('d-m-Y H:i');

if($_SERVER["REQUEST_METHOD"] == "POST"){
  
    if ($post["title"] == "" || $post["description"] == "") {
        $error = ["message" => "Please fill in the fields"];
        send_JSON($error);
    }

    $newPost = [
        "title" => $post["title"],
        "description" => $post["description"],
        "date" => $timestamp,
        "author" => $post["author"],
        "comments" =>[]
    ];
    
    $communityPost[] = $newPost;
    file_put_contents($filename, json_encode($communityPost, JSON_PRETTY_PRINT));
    send_JSON($newPost);

}else {
    send_JSON(["message" => "Wrong method"], 405);
}
?>