<?php

  include_once('../database.php');

  //Récupere le code JSON envoyées par Angular
  $json_data = file_get_contents('php://input');
  $dataReceived = json_decode($json_data,true);

  //Extraire les données reçues
  $sale_price = trim($dataReceived['totalPrice']);
  $baskets = $dataReceived['basket'];
  $userId = 1; //Id de l'user a récuperer une fois que la connexion sera effectué

  if(isset($dataReceived['client'])) {
    $clientId = trim($dataReceived['client']);
  }

  try {
    //Débuter une transaction
    $pdo->beginTransaction();

    //Insérer une nouvelle vente
    if(isset($dataReceived['client'])){
      $clientId=$dataReceived['client'];
      $stmt = $pdo->prepare("INSERT INTO Sale(Sale_Price,Sale_Date,Id_User,Id_Client) VALUES (:sale_price,CURDATE(),:userId,:clientId)");
      $stmt->bindParam(':clientId',$clientId,PDO::PARAM_INT);
    }else{
      $stmt = $pdo->prepare("INSERT INTO Sale(Sale_Price,Sale_Date,Id_User) VALUES (:sale_price,CURDATE(),:userId)");
    }

    $stmt->bindParam(':sale_price',$sale_price, PDO::PARAM_INT);
    $stmt->bindParam(':user_id',$userId,PDO::PARAM_INT);

    if($stmt->execute){
      $last_insert_id = $pdo->lastInsertId();
      echo "Insertion réussie. ID de la dernière ligne insérée : ".$last_insert_id;
    }else{
      $error=$stmt->errorInfo();
      echo "Erreur lors de l'insertion: ".$error[2];
    }

    // Insérer les détails de la vente pour chaque produit vendu
    foreach ($baskets as $basketItem) {
        $product = $basketItem[0];
        $quantity = $basketItem[1];
        $productId = $product['Id_Product'];

        $stmt = $pdo->prepare("INSERT INTO Sale_Product(Id_Product,Id_Sale,Quantity) VALUES (':productId',':last_id',':quantity')");
        $stmt->bindParam(':productId',$productId);
        $stmt->bindParam(':last_id',$last_insert_id);
        $stmt->bindParam(':quantity',$quantity);

        $stmt->execute();
    }

    // Valider la transaction
    $pdo->commit();

    $response = $last_insert_id;
    $data = array('message' => 'success');
    echo json_encode($response);
  }
  catch (PDOException $e) {
    // Rollback la transaction en cas d'erreur
    $pdo->rollBack();

    $data = array('message' => 'failed', 'error' => $e->getMessage());
    echo json_encode($data);
  }
?>
