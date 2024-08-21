<?php
header("Content-Type: application/json; charset=UTF-8");

//TODO for debugging; remove for production
/*
error_reporting(E_ALL);
ini_set('display_errors', 'On');
*/

function errorDie($msg, $code=400) {
  //mysqli_close($conn); //TODO handle this?
  http_response_code($code);
  die( json_encode(array('error' => $msg)) );
}

// Checks
/////////////////////////////////////////////////////////////////////
if (empty($_GET["id"])) {
  errorDie("no id in uri");
}

$id = htmlspecialchars($_GET["id"]);
if ($id === "") {
  errorDie("no parseable id in uri query field");
}

//TODO check for hex instead?
// 'id' here is an access hash.
if (!is_numeric($id)) {
  errorDie("expected numeric id", 404);
}

// Connect to the database
/////////////////////////////////////////////////////////////////////
//TODO make a user?
$servername = "db";
$username = "root";
$password = "root";
$dbname = "pon5_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  errorDie("database connection failed");
}

// Retreive full row matching the access hash.
/////////////////////////////////////////////////////////////////////
$sql = "SELECT * FROM videos WHERE access = " . $id;
$result = $conn->query($sql);
if ($result->num_rows === 0) {
  errorDie("no video found with that id", 404);
}

$info = $result->fetch_assoc();

// Retreive the name of the associated user who uploaded the video
/////////////////////////////////////////////////////////////////////
$sql = "SELECT * FROM users WHERE id = " . $info['uploader_id'];
$result = $conn->query($sql);

$uploader = "Anonymous"; // default, when user id is '1'
if ($result->num_rows !== 0) {
  $uploader = $result->fetch_assoc()['name'];
}

// remove the user id from the eventual server response.
// add the user name to the eventual server response.
/////////////////////////////////////////////////////////////////////
unset($info['uploader_id']);
$info['uploader'] = $uploader;

// Unformatting from previous sanitation
/////////////////////////////////////////////////////////////////////
$info['title'] = htmlspecialchars_decode($info['title']);
$info['description'] = htmlspecialchars_decode($info['description']);

echo json_encode($info);

mysqli_close($conn);
?>
