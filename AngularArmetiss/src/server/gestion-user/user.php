<?php

require_once('../database.php');
require_once('../manager/UserManager.php');

$userManager = new UserManager($pdo);
if (isset($_POST['login']) && isset($_POST['password'])) {
  $auth = $userManager->getUser($_POST['login'], $_POST['password']);


  if ($auth) {
    http_response_code(200);
    $userId=$userManager->getUserInfo($_POST['login']);
    $userRole=$userManager->getUserRole($_POST['login']);
    $response=array('id' => $userId,'role' => $userRole);
    header('Content-Type: application/json');
    echo json_encode($response);
  } else {
    http_response_code(403);
  }
} else {
  http_response_code(400);
}
