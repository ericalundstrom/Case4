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

if ($_SERVER["REQUEST_METHOD"] == "POST") { // make sure it's the right method




    function getRandomProfilePicture() {
        // Path to the folder containing profile pictures
        $folderPath = '../images/profileIcon/';

        // Get a list of image files in the folder
        $imageFiles = glob($folderPath . '*.png'); // Change the file extension if your images have a different extension

        var_dump($imageFiles);
        // Check if there are any images in the folder
        if (empty($imageFiles)) {
            return ''; // No images found
        }

        // Randomly select an image from the list
        $allFiles = scandir($folderPath);

        $randomImage = $folderPath . $imageFiles[array_rand($imageFiles)];

        // Return the selected image path
        return $randomImage;

    }

    // Example usage
    $userProfilePicture = getRandomProfilePicture();

    var_dump($userProfilePicture);

// Output the HTML with the user profile picture



    if (
        empty($input["personal"]["username"]) ||
        empty($input["personal"]["password"])
    ) {  // if field(s) empty
        send_JSON(["message" => "Please do not leave any field empty"], 400);
    }

    if (
        !isset(
            $input["personal"]["email"],
            $input["personal"]["username"],
            $input["personal"]["password"]
        )
    ) {
        send_JSON(["message" => "Wrong data"], 401);
    }

    // Additional validation if needed...

    if ($users != []) { // don't do this if no users yet
        foreach ($users as $userGroup) {
            foreach ($userGroup as $user) {
                if ($user["personal"]["username"] == $input["personal"]["username"]) { // check if username already exists
                    send_JSON(["message" => "Username already taken"], 409);
                }
                if ($user["personal"]["email"] == $input["personal"]["email"]) { // check if email already exists
                    send_JSON(["message" => "Email already taken"], 409);
                }
            }
        }
    }

    $time=time();
    $timestamp = date('d-m-Y H:i');

    $directory = "/images/profileIcon/";
    $img = glob($directory . "*.png");
    // $profileIcon = shuffle($img);
    // var_dump($profileIcon);

    $profileIcon = shuffle($img)[0];

    $newUser = [
        "personal" => [
            "email" => $input["personal"]["email"],
            "username" => $input["personal"]["username"],
            "password" => $input["personal"]["password"],
            "picture" => $profileIcon,
            "description" => "",
            "added" => $timestamp,
            "following" => "0",
            "followers" => "0"
        ],
        "comics" => []
    ];

    $users[] = [$newUser]; // Wrap the new user in an array (user group)
    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT)); // add new user to file

    unset($newUser["personal"]["password"]); // don't send password
    send_JSON($newUser); // return the new user

} else {
    send_JSON(["message" => "Wrong method"], 405);
}



?>