<?php
require_once("functions.php");
$filename = "/data/community.json";

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
$timestamp = date('d-m-Y');

if($_SERVER["REQUEST_METHOD"] == "POST"){
    // $uniqid()
  
    if (isset($post["title"])) {
        # code...
   
        if ($post["title"] == "" || $post["description"] == "") {
            $error = ["message" => "Please fill in the fields"];
            send_JSON($error);
        }

        // var_dump($post["picture"]);
        $newPost = [
            "id" => uniqid(),
            "title" => $post["title"],
            "description" => $post["description"],
            "date" => $timestamp,
            "author" => $post["author"],
            "picture" => $post["picture"],
            "comments" =>[]
        ];
        
        $communityPost[] = $newPost;
        file_put_contents($filename, json_encode($communityPost, JSON_PRETTY_PRINT));
        send_JSON($newPost);
    }

    if (isset($post["comment"])) {
        $id = $post["id"];
        $newComment = [
            "author" => $post["author"],
            "picture" => $post["picture"],
            "id" => $post["id"],
            "comment" => $post["comment"],
            "date" => $timestamp
        ];
    
        foreach ($communityPost as &$comment) {
            if ($id === $comment["id"]) {
                $comment["comments"][] = $newComment;
                file_put_contents($filename, json_encode($communityPost, JSON_PRETTY_PRINT));
                send_JSON($comment);
            }
        }
    
        // It's a good practice to unset the reference to avoid potential side effects
        // unset($comment);
    }
    

}else {
    send_JSON(["message" => "Wrong method"], 405);
}
?>