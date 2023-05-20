<?php

  include_once "../database.php";

  $client = [];
  $sql = "SELECT * FROM Client WHERE Client_Delete = FALSE";

  $stmt = $pdo->prepare($sql);
  $stmt->execute();
  while($row = $stmt->fetch(PDO::FETCH_ASSOC))
  {
    $client[] = $row;
  }

  echo json_encode(['data'=>$client]);
?>
