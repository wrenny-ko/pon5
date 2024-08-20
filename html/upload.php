<?php
header("Content-Type: multipart/form-data; charset=UTF-8");
//header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

//TODO remove
error_reporting(E_ALL);
ini_set('display_errors', 'On');

function errorDie($msg) {
  //mysqli_close($conn); //TODO
  http_response_code(400);
  die( json_encode(array('error' => $msg)) );
}

// https://www.phphelp.com/t/check-for-upload-file-size-too-large-is-not-working/34793/2
// convert numbers using K/k,M/m,G/g notation to actual number
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-2]);
    $bytes = $val[0, strlen($val) - 1);
    switch($last) {
        case "gb":
            $val *= 1024;
        case "mb":
            $val *= 1024;
        case "kb":
            $val *= 1024;
    }
    return $val;
}

//TODO MB or Mb?
function format_bytes($val) {
    $units = array("B", "KB", "MB", "GB");
    $index = 0;
    while ($val > 1024) {
            $val /= 1024;
            $index += 1;
    }
    return $val . $units[$index];
}

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if ($requestMethod !== 'POST') {
  errorDie("expected a POST request");
}

if (empty($_POST) or empty($_POST)) {
  $length = $_SERVER['CONTENT_LENGTH'];
  
  $umf = return_bytes(ini_get('upload_max_filesize'));
  $pms = return_bytes(ini_get('post_max_size'));
  $less = ($umf > $pms) ? $pms : $umf;
  if ($length >= $less) {
    errorDie("exceeded upload byte size limit of " . format_bytes($less));
  }
}

if (empty($_POST['info'])) {
  errorDie("file info json lacking");
}

$json = $_POST['info'];
if(!json_validate($json)) {
  errorDie("invalid json for file info");
}

//TODO also check user id
$info = json_decode($json);
if (!isset($info->title) or !isset($info->description)) {
  errorDie("improperly formatted file info");
}

if (!is_string($info->title) or !is_string($info->description)) {
  errorDie("improperly formatted file info. requires strings for title and description");
}

if ($info->title === "") {
  errorDie("uploads require a title");
}

if ($info->description === "") {
  $info->description = "apparently a description was deemed unecessary for this video";
}

$file = $_FILES['file'];
if (empty($file)) {
  errorDie("no file in request");
}

if (!is_uploaded_file($file['tmp_name'])) {
  errorDie("file error");
}

$extensions = array(
  'video/mp4' => 'mp4',
  'video/webm' => 'webm'
);

$mime_type = mime_content_type($file['tmp_name']);
if (! in_array($mime_type, array_keys($extensions))) {
    errorDie("only accepts mp4 or webm");
}

//TODO make a user
$servername = "db";
$username = "root";
$password = "root";
$dbname = "pon5_db";

$conn = new mysqli($servername, $username, $password, $dbname);

//TODO ensure close conn before die?
if ($conn->connect_error) {
  errorDie("Connection failed: " . $conn->connect_error);
}

//TODO add parsing of user id
$userid = 1; //anonymous user is 1

$sql = "INSERT INTO videos (uploader_id, mime_type, title, description) VALUES ($userid, '$mime_type', '$info->title', '$info->description')";

$result = $conn->query($sql);
if ($result === false) {
  errorDie("upload failed");
}

$id = $conn->insert_id;

$iterations = 600000;
$salt = random_bytes(8);
$hash = hash_pbkdf2("sha256", $id, $salt, $iterations, 8);

$hash_hex = bin2hex($hash);
$salt_hex = bin2hex($salt);

$sql = "UPDATE videos SET access = '$hash_hex', salt = '$salt_hex' WHERE id = $id";

$result = $conn->query($sql);
if ($result === false) {
  errorDie("error setting access hash");
}

$destination = '/var/www/html/videos/' . $hash_hex . '.' . $extensions[$mime_type];
if (!move_uploaded_file ($file['tmp_name'], $destination)) {
  errorDie("failed to move file");
}

mysqli_close($conn);

http_response_code(201);
echo json_encode(array('video' => $hash_hex));
?>
