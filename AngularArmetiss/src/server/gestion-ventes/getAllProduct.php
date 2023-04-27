<?php

  include_once('../database.php');

  $product = [];
  $sql = "SELECT * FROM Product";

  $stmt = $pdo->prepare($sql);
  $stmt->execute();

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $product[] = $row;
  }

  echo json_encode(['data'=>$product]);

?>
