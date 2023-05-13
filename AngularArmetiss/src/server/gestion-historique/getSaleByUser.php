<?php

include_once('../database.php');
$sale = [];
if (isset($_GET['id'])) {
  $userId = $_GET['id'];

  $sqlRequest = "SELECT * FROM Sale WHERE Id_User=:idUser";

  $stmt = $pdo->prepare($sqlRequest);
  $stmt->bindParam(':idUser', $userId);
  if ($stmt->execute()) {

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $sale[] = $row;
    }
    if ($sale) {
      echo json_encode(['data' => $sale]);
    } else {
      echo json_encode(['message' => 'No sale found']);
      http_response_code(200);
    }
  }
}
else{
  http_response_code(400); //bad request (quelque chose c'est mal passer)
}
