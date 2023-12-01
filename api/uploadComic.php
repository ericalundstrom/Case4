<?php

ini_set("display_errors", 1);

require_once("functions.php");

if ($_SERVER["REQUEST_METHOD"] === "POST"){
    $fileName = "data/users.json";
    $JSONusers = file_get_contents($fileName);
    $users = json_decode($JSONusers, true);

    $jsonREQUEST = file_get_contents("php://input");
    $dataREQUEST = json_decode($jsonREQUEST, true);

    $title = $dataREQUEST["title"];
    $currentUser = $dataREQUEST["user"];
    $frontPage = $dataREQUEST["img1"][0];
    $content = $dataREQUEST["content"];
    $filters = $dataREQUEST["filters"];
    $description = $dataREQUEST["description"];

        $comic = [
        "title" => $title,
        "description" => $description,
        "filters" => $filters,
        "frontPage" => $frontPage,
        "content" => $content,
        "likes" => [],
        ];


    foreach($users as $user){
        var_dump($user["personal"]);
        if($user["personal"]["email"] === $currentUser){
            $user["comics"] = $comic;
            break;
        };
    }

    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $data);
     send_JSON($comic, 200);
}


?>