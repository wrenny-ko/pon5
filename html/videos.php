<?php
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Origin: http://localhost:3000");

//TODO remove
error_reporting(E_ALL);
ini_set('display_errors', 'On');

//TODO make a user
$servername = "db";
$username = "root";
$password = "root";
$dbname = "pon5_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM videos";
$result = $conn->query($sql);

$response = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $response[] = $row;
  }
}

echo json_encode($response);

mysqli_close($conn);
?>
