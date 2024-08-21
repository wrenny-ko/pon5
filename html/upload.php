<?php
header("Content-Type: multipart/form-data; charset=UTF-8");
//header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

//TODO for debugging; remove for production
/*
error_reporting(E_ALL);
ini_set('display_errors', 'On');
*/

function errorDie($msg) {
  //mysqli_close($conn); //TODO handle this with a global? how to best clean up?
  http_response_code(400);
  die( json_encode(array('error' => $msg)) );
}

// https://www.phphelp.com/t/check-for-upload-file-size-too-large-is-not-working/34793/2
// convert byte size representations using K/k,M/m,G/g notation to actual number of bytes
// Example: '12KB' to '12288'
function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-2]);
    $bytes = mb_substr($val, 0, strlen($val)-1);
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

// TODO MB or Mb?
// forms the bite size notation from a raw bytes number.
// Example: '12288' to '12KB'
function format_bytes($val) {
    $units = array("B", "KB", "MB", "GB");
    $index = 0;
    while ($val > 1024) {
            $val /= 1024;
            $index += 1;
    }
    return $val . $units[$index];
}

// Checks
/////////////////////////////////////////////////////////////////////
$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if ($requestMethod !== 'POST') {
  errorDie("expected a POST request");
}

// check for behavior when a form was too large to accept
if (empty($_POST)) {
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

//TODO add functionality for testing and parsing user ids

if (!array_key_exists('file', $_FILES)) {
  errorDie("no file in request");
}

$file = $_FILES['file'];
if (empty($file)) {
  errorDie("empty file in request");
}

if (!is_uploaded_file($file['tmp_name'])) {
  errorDie("file error");
}

$extensions = array(
  'video/mp4' => 'mp4',
  'video/webm' => 'webm'
);

$mime_type = mime_content_type($file['tmp_name']);
if ( !in_array($mime_type, array_keys($extensions)) ) {
    errorDie("only accepts mp4 or webm");
}


// Database Insert for video
/////////////////////////////////////////////////////////////////////
//TODO make a user?
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

$escaped_mime = htmlspecialchars($mime_type);
$escaped_title = htmlspecialchars($info->title);
$escaped_description = htmlspecialchars($info->description);

$sql = "INSERT INTO videos (uploader_id, mime_type, title, description) VALUES ($userid, '$escaped_mime', '$escaped_title', '$escaped_description')";

$result = $conn->query($sql);
if ($result === false) {
  errorDie("upload failed");
}


// Generate video access hash, Update the database row
/////////////////////////////////////////////////////////////////////
$id = $conn->insert_id;

$iterations = 600000;
$salt = random_bytes(8);
$hash = hash_pbkdf2("sha256", $id, $salt, $iterations, 8);

$hash_hex = bin2hex($hash);

$sql = "UPDATE videos SET access = '$hash_hex' WHERE id = $id";

$result = $conn->query($sql);
if ($result === false) {
  errorDie("error setting access hash");
}

mysqli_close($conn);

// Copy the tmp video file to the public-served folder
/////////////////////////////////////////////////////////////////////
$destination = '/var/www/html/videos/' . $hash_hex . '.' . $extensions[$mime_type];
if (!move_uploaded_file ($file['tmp_name'], $destination)) {
  errorDie("failed to move file");
}

// Generate thumbnail image, save to public thumbnails folder
/////////////////////////////////////////////////////////////////////
$thumbnail_path = "/var/www/html/thumbnails/" . $hash_hex . '.jpeg';
$cmd = "/usr/bin/ffmpeg -i $destination -ss 1 -t 00:00:01  -s '300x300' -r 1 -y -vcodec mjpeg -f mjpeg $thumbnail_path 2>&1";
exec($cmd, $output, $retval);

if ($retval) {
    errorDie('error in generating video thumbnail');
}

http_response_code(201);
echo json_encode(array('video' => $hash_hex));
?>
