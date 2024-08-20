<?php
header("Content-Type: application/json; charset=UTF-8");

//TODO remove
error_reporting(E_ALL);
ini_set('display_errors', 'On');

function errorDie($msg) {
  //mysqli_close($conn); //TODO
  http_response_code(400);
  die( json_encode(array('error' => $msg)) );
}

if (empty($_GET["id"])) {
  errorDie("no id in uri");
}
$id = htmlspecialchars($_GET["id"]);
if ($id === "") {
  errorDie("no parseable id in uri query field");
}

//TODO check for hex instead of below
/*
if (!is_numeric($id)) {
  errorDie("expected numeric id");
}
*/

//TODO make a user
$servername = "db";
$username = "root";
$password = "root";
$dbname = "pon5_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM videos WHERE access = " . $id;
$result = $conn->query($sql);
if ($result->num_rows === 0) {
  errorDie("no video found with that id");
}

$info = $result->fetch_assoc();

$sql = "SELECT * FROM users WHERE id = " . $info['uploader_id'];
$result = $conn->query($sql);

$uploader = "Anonymous";
if ($result->num_rows !== 0) {
  $uploader = $result->fetch_assoc()['name'];
}

unset($info['uploader_id']);
$info['uploader'] = $uploader;

echo json_encode($info);

mysqli_close($conn);
?>
