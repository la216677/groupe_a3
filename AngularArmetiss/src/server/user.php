<?php
require_once('manager/DBManager.php');
require_once('manager/UserManager.php');

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: POST");

$dbManager = new DBManager();
$pdo = $dbManager->connect();
$userManager = new UserManager($pdo);

if (isset($_POST['login']) && isset($_POST['password'])) {
  $auth = $userManager->getUser($_POST['login'], $_POST['password']);
  if ($auth) {
    http_response_code(200);
  } else {
    http_response_code(403);
  }
} else {
  http_response_code(400);
}
