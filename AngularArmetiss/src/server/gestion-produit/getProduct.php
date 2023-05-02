<?php

  include_once('../database.php');

  $product = [];
  $sqlRequest = "SELECT * FROM Product";

  $stmt = $pdo->prepare($sqlRequest);
  $stmt->execute();

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $product[] = $row;
  }

  echo json_encode(['data'=>$product]);
?>