<?php
include_once('../database.php');

// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  //extraire les données
  $request = json_decode($postdata);

  $id_Category = mysqli_real_escape_string($mysqli, trim($request->ID_Category));
  $category_Name = trim($request->Category_Name);
  $category_Description = trim($request->Category_Description);
  $category_Visibility = trim($request->Category_Visibility);


  $sql = "UPDATE Category SET 
            Category_Name = :category_Name, 
            Category_Description = :category_Description,
            Category_Visibility = :category_Visibility
          WHERE ID_Category = :id_Category";

  $stmt = $pdo->prepare($sql);
  $stmt->bindParam("category_Name",$category_Name);
  $stmt->bindParam("category_Description",$category_Description);
  $stmt->bindParam("category_Visibility",$category_Visibility);
  $stmt->bindParam("id_Category",$id_Category);

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
