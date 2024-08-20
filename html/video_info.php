<?php
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Origin: http://localhost:3000");

function errorDie($msg) {
  //mysqli_close($conn); //TODO
  http_response_code(400);
  die( json_encode(array('error' => $msg)) );
}

$parsed = parse_url($_REQUEST['link']);
$query = $parsed['query'];
if (empty($query)) {
  errorDie("no query in uri");
}

$id = $query['id']
if (empty($id)) {
  errorDie("no id in uri query field");
}

if (!is_numeric($id)) {
  errorDie("expected numeric id");
}

//TODO make a user
$servername = "db";
$username = "root";
$password = "root";
$dbname = "pon5_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM videos WHERE id EQUALS " . $id;
$result = $conn->query($sql);
if ($result->num_rows === 0) {
  errorDie("no video found with that id");
}

$row = $result->fetch_assoc();

$sql = "SELECT * FROM users WHERE id EQUALS " . $row['uploader_id'];
$result = $conn->query($sql);

$uploader = array();
if ($result->num_rows === 0) {
  
  //errorDie("uploader id is invalid");
}
//TODO just assign anonymous user in this case

$response = array(
  'id': $row['id'],
  'likes': $row['likes'],
  'timestamp': $row['timestamp'],
  'uploader': $row['uploader_id'], //TODO fetch name?
  'dislikes': $row['dislikes'],
  'views': $row[]
);



echo json_encode($response);

mysqli_close($conn);
?>
