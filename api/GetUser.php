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
    }

    if (isset($_GET["userPic"])) {

        $username = $_GET["userPic"];

        foreach($users as $user){
            $userPersonal = $user["personal"];
            $userName = $userPersonal["username"];
            
            if ($userName === $username) {
                $userPicture = $userPersonal["picture"];
                send_JSON($userPicture);
            }
        }

        $error = ["error" => "User not found"];
        send_JSON($error, 404);
    } 

    if (isset($_GET["userSearch"])) {
        
        $search = $_GET["userSearch"];
        // $title = trim($username, '"');
        
        foreach($users as $user){
            // send_JSON($users);
            // $userPersonal = $user["personal"];
            foreach($user as $part){

                $userPersonal = $part["personal"];
                $userName = $userPersonal["username"];
                // var_dump($userName);
                // var_dump($title);
               
                if (strstr($userName, $search)) {
    
                    send_JSON($user);
                }
            };
        }

    }


    if (isset($_GET["comic"])) {
        $titleOfComic = $_GET["comic"];
        
        foreach ($users as $user) {
            foreach ($user as $part) {
                if ($titleOfComic === "") {
                    // If titleOfComic is empty, send all comics back
                    send_JSON($part["comics"]);
                }
    
                $userComicArray = $part["comics"];
    
                foreach ($userComicArray as $comic) {
                    $comicTitle = $comic["title"];
                    
                    $minSimilarityPercentage = 50; // Adjust this threshold as needed
    
                    // Check if the titles are above the minimum similarity threshold
                    similar_text($comicTitle, $titleOfComic, $percent);
    
                    if ($percent >= $minSimilarityPercentage) {
                        send_JSON($comic);
                    }
                }
            }
        }
    
        $error = ["error" => "Hittade ingen matchande"];
        send_JSON($error, 400);
    }
    
    

}else{
    $error = ["error" => "Fel här"];
    send_JSON($error, 400);
}

?>