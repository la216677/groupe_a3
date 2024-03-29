<?php
include_once('../database.php');

// Recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

  // Extraire les données
  $request = json_decode($postdata);

  $product_Name = trim($request->Product_Name);
  $product_Sale_Price_TVAC = trim($request->Product_Sale_Price_TVAC);
  $id_TVA = trim($request->Id_TVA);

  $tva_rateFloat = 0.0;
  $stmt = $pdo->prepare("SELECT TVA_Rate FROM TVA WHERE ID_TVA = :id");
  $stmt->bindParam(':id', $id_TVA);
  $stmt->execute();
  $tva_rate = $stmt->fetchColumn();
  if ($tva_rate !== false) {
    $tva_rateFloat = floatval($tva_rate);
  }

  $product_Sale_Price_HTVA = trim($product_Sale_Price_TVAC / (1+$tva_rateFloat));
  $product_Description = trim($request->Product_Description);
  $product_Quantity = 0;
  $product_Image_URL = trim($request->Product_Image_URL);
  $product_Visibility = trim($request->Product_Visibility);
  $id_Category = trim($request->Id_Category);

  // Vérifier si l'image est nulle ou vide
  if (!empty($product_Image_URL)) {
    $product_Image_URL = "$product_Image_URL"; // Encadrer la valeur avec des quotes simples
  } else {
    $product_Image_URL = null; // Définir la valeur comme NULL si elle est nulle ou vide
  }

  // Construire la requête SQL en excluant la colonne Product_Image_URL si elle est nulle ou vide
  $sql = "INSERT INTO Product(Product_Name, Product_Sale_Price_HTVA, Product_Sale_Price_TVAC, Product_Description, Product_Quantity, Product_Visibility, Id_TVA, Id_Category, Product_Image_URL) VALUES (:product_Name, :product_Sale_Price_HTVA, :product_Sale_Price_TVAC, :product_Description, :product_Quantity, :product_Visibility, :id_TVA, :id_Category, :product_Image_URL)";

  // Préparer la requête PDO
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':product_Name', $product_Name);
  $stmt->bindParam(':product_Sale_Price_HTVA', $product_Sale_Price_HTVA);
  $stmt->bindParam(':product_Sale_Price_TVAC', $product_Sale_Price_TVAC);
  $stmt->bindParam(':product_Description', $product_Description);
  $stmt->bindParam(':product_Quantity', $product_Quantity);
  $stmt->bindParam(':product_Visibility', $product_Visibility);
  $stmt->bindParam(':id_TVA', $id_TVA);
  $stmt->bindParam(':id_Category', $id_Category);
  $stmt->bindParam(':product_Image_URL', $product_Image_URL, PDO::PARAM_NULL);

  if($stmt->execute()){
    $data = array('message' => 'success');
  } else {
    $data = array('message' => 'failed');
  }

  echo json_encode($data);
}
?>
