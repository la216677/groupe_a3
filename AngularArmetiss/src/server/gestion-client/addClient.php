<?php
include_once('../database.php');


// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

  //extraire les données
  $request = json_decode($postdata);

  $last_name = trim($request->Client_Last_Name);
  $first_name = trim($request->Client_Name);
  $email = trim($request->Client_Email);
  $numTel = trim($request->Client_NumTel);
  $adresse = trim($request->Client_Adresse);

  $sql = "INSERT INTO Client(Client_Last_Name, Client_Name, Client_Email, Client_NumTel, Client_Adresse)
  VALUES (:last_name, :first_name, :email, :numTel, :adresse)";

  $stmt=$pdo->prepare($sql);

  $stmt->bindParam(':last_name', $last_name);
  $stmt->bindParam(':first_name', $first_name);
  $stmt->bindParam(':email', $email);
  $stmt->bindParam(':numTel', $numTel);
  $stmt->bindParam(':adresse', $adresse);

  if($stmt->execute()){
    $data = array('message' => 'success');
    echo json_encode($data);
  } else{
    $data = array('message' => 'failed');
    echo json_encode($data);
  }
}
?>
