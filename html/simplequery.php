<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
$myArr = array("1234", "1235", "1");

$myJSON = json_encode($myArr);

echo $myJSON;
?>
