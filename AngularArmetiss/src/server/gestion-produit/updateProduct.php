<?php
include_once('../database.php');

// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  //extraire les données
  $request = json_decode($postdata);

  $product_ID = trim($request->Id_Product);
  $product_Name = trim($request->Product_Name);
  $product_Sale_Price_HTVA = trim($request->Product_Sale_Price_HTVA);
  $product_Sale_Price_TVAC = trim($request->Product_Sale_Price_TVAC);
  $product_Description = trim($request->Product_Description);
  $product_Image_URL = trim($request->Product_Image_URL);
  $product_Visibility = trim($request->Product_Visibility);
  $id_TVA = trim($request->Id_TVA);
  $id_Category = trim($request->Id_Category);

  $sql = "UPDATE Product SET 
            Product_Name = :product_Name, 
            Product_Sale_Price_HTVA = :product_Sale_Price_HTVA, 
            Product_Sale_Price_TVAC = :product_Sale_Price_TVAC, 
            Product_Description = :product_Description, 
            Product_Image_URL = :product_Image_URL, 
            Product_Visibility = :product_Visibility, 
            Id_TVA = :id_TVA, 
            Id_Category = :id_Category
          WHERE Id_Product = :product_ID";

  $stmt = $pdo->prepare($sql);

  $stmt->bindParam(':product_Name', $product_Name);
  $stmt->bindParam(':product_Sale_Price_HTVA', $product_Sale_Price_HTVA);
  $stmt->bindParam(':product_Sale_Price_TVAC', $product_Sale_Price_TVAC);
  $stmt->bindParam(':product_Description', $product_Description);
  $stmt->bindParam(':product_Image_URL', $product_Image_URL);
  $stmt->bindParam(':product_Visibility', $product_Visibility);
  $stmt->bindParam(':id_TVA', $id_TVA);
  $stmt->bindParam(':id_Category', $id_Category);
  $stmt->bindParam(':product_ID', $product_ID);

  
  if ($stmt->execute()) {
    $data = array('message' => 'success');
    echo json_encode($data);
  } else {
    $data = array('message' => 'failed');
    echo json_encode($data);
  }
}
?>
