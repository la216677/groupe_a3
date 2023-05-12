<?php

    include_once('../database.php');

    $idProduct = $_GET['id'];
    $url = "";
    $sqlRequest = "SELECT Product_Image_URL FROM Product WHERE Id_Product=:idProduct";
    $stmt = $pdo->prepare($sqlRequest);
    $stmt->bindValue('idProduct', $idProduct);

    if($stmt->execute())
    {
      while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $url = $row['Product_Image_URL'];
      }

      http_response_code(200);
      header('Content-Type: application/json');
      echo json_encode(['data'=>$url]);
    }
    else
    {
      http_response_code(404);
    }

?>
