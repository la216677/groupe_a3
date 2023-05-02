<?php 

  include_once('../database.php');

  $tva = [];
  $sql = "SELECT * FROM TVA";

  $stmt = $pdo->query($sql);
  if($stmt !== false){
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      $tva[] = $row;
    }

    echo json_encode(['data'=>$tva]);
  }else{
    http_response_code(404);
  }
?>