<?php

include_once('../database.php');

$info;
$sql = "SELECT * FROM Society_Info";

try{
  $stmt=$pdo->query($sql);
  $info=$stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode(['data' =>$info]);
}catch(PDOException $e){
  http_response_code(404);
}
?>
