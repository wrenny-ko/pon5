<?php
header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Origin: http://localhost:3000");

//TODO for debugging; remove for production
/*
error_reporting(E_ALL);
ini_set('display_errors', 'On');
*/

// Connect to databse
/////////////////////////////////////////////////////////////////////
//TODO make a user?
$servername = "db";
$username = "root";
$password = "root";
$dbname = "pon5_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Collect all video access hashes (used to obfuscate the uris and filenames)
/////////////////////////////////////////////////////////////////////
$sql = "SELECT access FROM videos";
$result = $conn->query($sql);

$response = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $response[] = $row['access'];
  }
}

echo json_encode($response);

mysqli_close($conn);
?>
