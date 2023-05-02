<?php
include_once('../database.php');


// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

  //extraire les données
  $request = json_decode($postdata);

  $category_Name = trim($request->Category_Name);
  $category_Description = trim($request->Category_Description);
  $category_Image_URL = trim($request->Category_Image_URL);
  $category_Visibility = trim($request->Category_Visibility);

  $sql = "INSERT INTO Category(Category_Name,Category_Description,Category_Image_URL,Category_Visibility)
  VALUES (:category_Name, :category_Description, :category_Image_URL, :category_Visibility)";

  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(':category_Name',$category_Name);
  $stmt->bindParam(':category_Description',$category_Description);
  $stmt->bindParam(':category_Image_URL',$category_Image_URL);
  $stmt->bindParam(':category_Visibility',$category_Visibility);

  try{
    $stmt->execute();
    $data=array('message' => 'success');
    echo json_encode($data);
  }catch(PDOException $e){
    $data = array('message' => 'failed');
    echo json_encode($data);
  }
}
?>
