<?php
include_once('../database.php');

// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  //extraire les données
  $request = json_decode($postdata);

  $id = trim($request->ID_Client);
  $last_name = trim($request->Client_Last_Name);
  $first_name = trim($request->Client_Name);
  $email = trim($request->Client_Email);
  $numTel = trim($request->Client_NumTel);
  $adresse = trim($request->Client_Adresse);

  $sql = "UPDATE Client SET Client_Name = :names, Client_Last_Name = :lastname, Client_Email = :email, Client_NumTel = :numTel, Client_Adresse = :adresse WHERE ID_Client = :id";

  $stmt=$pdo->prepare($sql);
  $stmt->bindParam(":names", $first_name);
  $stmt->bindParam(":lastname", $last_name);
  $stmt->bindParam(":email", $email);
  $stmt->bindParam(":numTel", $numTel);
  $stmt->bindParam(":adresse", $adresse);
  $stmt->bindParam(":id", $id);

  if($stmt->execute()){
    $data = array('message' => 'success');
    echo json_encode($data);
  } else{
    $data = array('message' => 'failed');
    echo json_encode($data);
  }
}
?>
