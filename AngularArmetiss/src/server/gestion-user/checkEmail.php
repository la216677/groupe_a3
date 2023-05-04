<?php
include_once('../database.php');


// Vérification si l'email existe déjà dans la table des utilisateurs
$email = $_GET['email'];
$sql = "SELECT COUNT(*) AS count FROM Users WHERE User_Email_Address=:email";

  try{
    $stmt=$pdo->prepare($sql);
    $stmt->bindParam(':email',$email,PDO::FETCH_ASSOC);

    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $count=$row["count"];
    if($count>0){
      echo json_encode(true);
    }else{
      echo json_encode(false);
    }
  }catch(PDOException $e){
    echo json_encode(false);
  }
?>