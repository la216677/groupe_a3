<?php

include_once('../database.php');

$roles = [];
$sql = "SELECT Id_User FROM Users WHERE User_Email_Address = :user AND User_Password = :password";

try{



  $stmt=$pdo->prepare($sql);

  $stmt->execute();

  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach($result as $row){
    $roles[]=array(
      'Id_User'=>$row['Id_User'],
    );
  }

  echo json_encode(['data'=>$roles]);
}
catch(PDOException $e)
{
  http_response_code(404);
}

?>
