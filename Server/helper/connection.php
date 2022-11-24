<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");

$db_host = "localhost";
$db_user = "root";
$db_password = null;
$db_name = "platoniadb";

$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";

$PDO = new PDO($dsn, $db_user, $db_password);
