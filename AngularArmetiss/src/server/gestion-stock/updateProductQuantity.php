<?php

require_once('../database.php');

$sql = " SELECT SUM(Stock_Quantity)FROM Stock WHERE Id_Product = :idProduct";
$sql2 = " SELECT SUM(Quantity)FROM Sale_Product WHERE Id_Product = :idProduct";
$sql3 = "UPDATE Product SET Product_Quantity = :stock WHERE `Id_Product`= :idProduct";

$ProductQuantity = 0;
$idproduct = "";
$sommeProduct = 0;


if (isset($_POST['idProduct']) && !empty($_POST['idProduct'])) {
  $idproduct = trim($_POST['idProduct']);

  try {


    $stmt = $pdo->prepare($sql);

    $stmt->bindValue(':idProduct', $idproduct);

    if ($stmt->execute()) {
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

      foreach ($result as $row) {
        $sommeProductString = $row['SUM(Stock_Quantity)'];
        $sommeProduct = intval($sommeProductString);
        $data2 = array('message' => 'Valeur de somme product : ' . $sommeProduct);

          echo json_encode($data2);
      }

      $stmt2 = $pdo->prepare($sql2);

      $stmt2->bindValue(':idProduct', $idproduct);

      if ($stmt2->execute()) {
        $result = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        foreach ($result as $row) {
          $ProductQuantityString = $row['SUM(Quantity)'];
          $ProductQuantity = intval($ProductQuantityString);
        }

        $stock = $sommeProduct - $ProductQuantity;
        $stmt3 = $pdo->prepare($sql3);

        $stmt3->bindValue(':stock', $stock);
        $stmt3->bindValue(':idProduct', $idproduct);

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
    http_response_code(404);
  }
}
