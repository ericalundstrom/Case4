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
    $user = $dataREQUEST["user"];
    $currentUser = trim($user, '"');
    $frontPage = $dataREQUEST["img1"][0];
    $content = $dataREQUEST["content"];
    $stringRepresentation = $dataREQUEST["filters"];

    $stringRepresentation = str_replace(['\\'], '', $stringRepresentation);

    $time=time();
    $timestamp = date('d-m-Y H:i');

    
    $filters = $dataREQUEST["filters"];
    $description = $dataREQUEST["description"];

        // $comic = [
        // "title" => $title,
        // "description" => $description,
        // "filters" => $stringRepresentation,
        // "frontPage" => $frontPage,
        // "content" => $content,
        // "time" => $timestamp,
        // "likes" => [],
        // ];

        // ... (previous code)

    $comic = [
        "title" => $title,
        "author" => $user,
        "description" => $description,
        "filters" => str_replace('\\', '', $stringRepresentation), // Remove backslashes from filters
        "frontPage" => str_replace('\\', '/', $frontPage), // Replace backslashes with forward slashes in frontPage
        "content" => array_map(function ($item) {
            return str_replace('\\', '/', $item); // Replace backslashes with forward slashes in content
        }, $content),
        "time" => date("d/m/Y"), // Assuming you want to store the current date
        "likes" => [],
    ];

// ... (rest of the code)



    foreach($users as &$user){
        // var_dump($user[0]["personal"]["username"]);
        // var_dump($currentUser);
        if($user[0]["personal"]["username"] === $currentUser){
            $user[0]["comics"][] = $comic;
            break;
        }
    };
    
    // $erica = ["message" => "fel här"];
    // send_JSON($erica,400);
    $data = json_encode($users, JSON_PRETTY_PRINT);
    file_put_contents($fileName, $data);

    send_JSON($comic);
}


?>