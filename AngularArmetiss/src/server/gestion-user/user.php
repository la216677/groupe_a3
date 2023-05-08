<?php

require_once('../database.php');
require_once('../manager/UserManager.php');

$userManager = new UserManager($pdo);
if (isset($_POST['login']) && isset($_POST['password'])) {
  $mdp = $userManager->getMdp($_POST['login']);
  // $auth = $userManager->getUser($_POST['login'], $_POST['password']);
  $auth = $userManager->getUser($_POST['login'],password_verify($_POST['password'],$mdp) );

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
