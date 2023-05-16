<?php

require_once('../database.php');
require_once('../manager/UserManager.php');

$userManager = new UserManager($pdo);

$sql = "SELECT TVA_Rate FROM TVA WHERE TVA_Rate_Name = :tva";

$tva = 0;

try{

  $nameTva = "TVA-générale";

  $stmt=$pdo->prepare($sql);

  $stmt->bindValue(':tva', $nameTva, PDO::PARAM_STR);

  if($stmt->execute()){
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($result as $row){
      $tvaString = $row['TVA_Rate'];
      $tva = floatval($tvaString);
      $tva += 1 ;
    }

    http_response_code(200);
  } else{
    http_response_code(400);
  }



}
catch(PDOException $e)
{
  http_response_code(404);
}


if ((isset($_POST['quantity']) && !empty($_POST['quantity'])) && (isset($_POST['price']) && !empty($_POST['price'])) && (isset($_POST['purchaseDate']) && !empty($_POST['purchaseDate'])) && (isset($_POST['provider']) && !empty($_POST['provider'])) && (isset($_POST['id']) && !empty($_POST['id']))) {
try {
  $quantity = trim($_POST['quantity']);
  $price =  trim($_POST['price']);
  $purchaseDate =  trim($_POST['purchaseDate']);
  $provider =  trim($_POST['provider']);
  $id =  trim($_POST['id']);

  $time = strtotime($purchaseDate);

  $purchaseDateOk = date('Y-m-d',$time);

  $sql = "INSERT INTO Stock(Stock_Quantity, Stock_Date, Stock_Purchase_Price_HTVA, Stock_Purchase_Price_TVAC, Id_Product, Stock_Provider)
    VALUES ( :quantity, :purchaseDate, :priceHtva, :priceTva, :id ,:provider)";

  $stmt=$pdo->prepare($sql);

  $prixTva = $price*$quantity;
  $prixHtva = $prixTva/$tva;


  $stmt->bindParam(':quantity', $quantity);
  $stmt->bindParam(':purchaseDate', $purchaseDateOk);
  $stmt->bindParam(':priceHtva', $prixHtva);
  $stmt->bindValue(':priceTva', $prixTva);
  $stmt->bindParam(':id', $id);
  $stmt->bindParam(':provider', $provider);

  if($stmt->execute()){
    $data = array('message' => 'success');

    echo json_encode($data);
    http_response_code(200);
  } else{
    $data = array('message' => 'failed');
    echo json_encode($data);

    http_response_code(400);
  }
}
  catch (Exception $e) {
    http_response_code(400);
  }

}
?>
