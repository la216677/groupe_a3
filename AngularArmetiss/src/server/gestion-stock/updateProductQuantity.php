<?php

require_once('../database.php');

$sql = "SELECT SUM(Stock_Quantity) AS stock FROM Stock WHERE Id_Product = :idProduct";
$sql2 = "SELECT SUM(Quantity) AS quantity FROM Sale_Product WHERE Id_Product = :idProduct";
$sql3 = "UPDATE Product SET Product_Quantity = :stock WHERE Id_Product = :idProduct";

$idproduct = $_POST['idProduct'];

try {
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':idProduct', $idproduct);

  if ($stmt->execute()) {
    $stock = $stmt->fetchColumn();

    $stmt2 = $pdo->prepare($sql2);
    $stmt2->bindParam(':idProduct', $idproduct);

    if ($stmt2->execute()) {
      $quantity = $stmt2->fetchColumn();

      $stock -= $quantity;

      $stmt3 = $pdo->prepare($sql3);
      $stmt3->bindParam(':stock', $stock);
      $stmt3->bindParam(':idProduct', $idproduct);

      if ($stmt3->execute()) {
        $data = array('message' => 'Tout est OK');
        echo json_encode($data);
        http_response_code(200);
      } else {
        $data = array('message' => 'Erreur sql3');
        echo json_encode($data);
        http_response_code(400);
      }
    } else {
      $data = array('message' => 'Erreur sql2');
      echo json_encode($data);
      http_response_code(400);
    }
  } else {
    $data = array('message' => 'Erreur sql1');
    echo json_encode($data);
    http_response_code(400);
  }
} catch (PDOException $e) {
  $data = array('message' => 'Erreur de la base de données');
  echo json_encode($data);
  http_response_code(404);
}
