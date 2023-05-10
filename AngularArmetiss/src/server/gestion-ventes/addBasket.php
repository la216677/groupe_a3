<?php

include_once('../database.php');

$product = 0;
$quantity = 0;
$product_quantity = 0; // Removed the global variable, which is unnecessary

// Récupérer le code JSON envoyé par Angular
$json_data = file_get_contents('php://input');
$dataReceived = json_decode($json_data, true);

// Extraire les données reçues
$sale_price = isset($dataReceived['totalPrice']) ? trim($dataReceived['totalPrice']) : null;
$baskets = isset($dataReceived['basket']) ? $dataReceived['basket'] : null;
$userId = isset($dataReceived['user']) ? trim($dataReceived['user']) : null; // Id de l'utilisateur à récupérer une fois que la connexion sera effectuée
$clientId = isset($dataReceived['client']) ? trim($dataReceived['client']) : null;

try {
  // Débuter une transaction
  $pdo->beginTransaction();

  // Insérer une nouvelle vente
  $stmt = $pdo->prepare("INSERT INTO Sale (Sale_Price, Sale_Date, Id_User, Id_Client) VALUES (:sale_price, CURDATE(), :userId, IF(:clientId = '-1', NULL, :clientId))");
  $stmt->bindParam(':clientId', $clientId, PDO::PARAM_INT);
  $stmt->bindParam(':sale_price', $sale_price, PDO::PARAM_INT);
  $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);

  if ($stmt->execute()) {
    $last_insert_id = $pdo->lastInsertId();

    // Insérer les détails de la vente pour chaque produit vendu
    if (is_array($baskets)) {
      foreach ($baskets as $basketItem) {

        $product = isset($basketItem[0]) ? $basketItem[0] : null;
        $quantity = isset($basketItem[1]) ? $basketItem[1] : null;

        // Check if product and quantity are not null before proceeding
        if ($product && $quantity) {
          $productId = $product['Id_Product'];

          $stmt = $pdo->prepare("INSERT INTO Sale_Product (Id_Product, Id_Sale, Quantity) VALUES (:productId, :last_insert_id, :quantity)");
          $stmt->bindParam(':productId', $productId, PDO::PARAM_INT);
          $stmt->bindParam(':last_insert_id', $last_insert_id, PDO::PARAM_INT);
          $stmt->bindParam(':quantity', $quantity);

          $stmt->execute();

          $stmt2 = $pdo->prepare("SELECT Product_Quantity FROM Product WHERE Id_Product = :productId");
          $stmt2->bindParam(':productId', $productId, PDO::PARAM_INT);

          if ($stmt2->execute()) {
            $result = $stmt2->fetchAll(PDO::FETCH_ASSOC);

            foreach ($result as $row) {
              $stockQuantityString = $row['Product_Quantity'];
              $product_quantity = intval($stockQuantityString); // Removed the use of the global variable
            }

            $stmt3 = $pdo->prepare("UPDATE Product SET Product_Quantity = :product_quantity - :quantity WHERE Id_Product = :productId");
            $stmt3->bindParam(':product_quantity', $product_quantity, PDO::PARAM_INT);
            $stmt3->bindParam(':quantity', $quantity, PDO::PARAM_INT);
            $stmt3->bindParam(':productId', $productId, PDO::PARAM_INT);

            $stmt3->execute();
          }
        }
      }
    }

    // Valider la transaction
    $pdo->commit();
    $response = $last_insert_id;
    $data = array('message' => 'success');
    echo json_encode($response);
  } else {
    $error = $stmt->errorInfo();
    echo "Erreur lors de l'insertion: " . $error[2];
  }
} catch (PDOException $e) {
  // Rollback la transaction en cas d'erreur
  $pdo->rollBack();

  $data = array('message' => 'failed', 'error' => $e->getMessage());
  echo json_encode($data);
}
