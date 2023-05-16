<?php

include_once('../database.php');
$sale = [];
$idClient = null;
if (isset($_GET['id'])) {
  $idSale = $_GET['id'];
  $sqlRequest = "SELECT * FROM Sale WHERE Id_Sale=:idSale";

  $stmt = $pdo->prepare($sqlRequest);
  $stmt->bindParam(':idSale', $idSale);
  if ($stmt->execute()) {

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $sale[] = $row;
    }
    if ($sale) {

      $idClient = $sale[0]['Id_Client'];
      $sqlRequest = "SELECT Client_Name,Client_Last_Name FROM Client WHERE ID_Client=:idClient";

      $stmt = $pdo->prepare($sqlRequest);
      $stmt->bindParam(':idClient', $idClient);
      if ($stmt->execute()) {
        $client = $stmt->fetch(PDO::FETCH_ASSOC);
        $sale[0]['Client_Name'] = $client['Client_Name'];
        $sale[0]['Client_Last_Name'] = $client['Client_Last_Name'];
      }
      echo json_encode(['data' => $sale]);
      http_response_code(200);
    } else {
      echo json_encode(['message' => 'No sale found']);
      http_response_code(200);
    }
  }
}
else{
  http_response_code(400); //bad request (quelque chose c'est mal passer)
}
