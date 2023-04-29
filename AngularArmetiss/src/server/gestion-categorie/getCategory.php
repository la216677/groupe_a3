<?php

include_once('../database.php');

$category = [];
$sql = "SELECT * FROM Category";

$stmt = $pdo->prepare($sql);
if($stmt->execute()){
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $category[] = $row;
  }

  echo json_encode(['data' => $category]);
} else {
  http_response_code(404);
}

?>
