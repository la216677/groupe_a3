<?php

include_once('../database.php');

$users = [];
$sql = "SELECT * FROM Client";

try{
  $stmt=$pdo->query($sql);
  $users=$stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(['data' =>$users]);
}catch(PDOException $e){
  http_response_code(404);
}
?>
