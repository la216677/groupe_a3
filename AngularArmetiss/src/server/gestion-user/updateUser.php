<?php
include_once('../database.php');

// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  //extraire les données
  $request = json_decode($postdata);

  $id = trim($request->Id_User);
  $last_name = trim($request->User_Last_Name);
  $first_name = trim($request->User_First_Name);
  $pwd = trim($request->User_Password);
  $email = trim($request->User_Email_Address);
  $birthDate = trim($request->User_BirthDate);
  $activity = trim($request->User_Activity);
  $role = trim($request->Id_Role);

  $sql = "UPDATE Users SET 
            User_Last_Name = :last_name, 
            User_First_Name = :first_name, 
            User_Email_Address = :email, 
            User_BirthDate = :birthDate, 
            User_Password = :pwd, 
            User_Activity = :activity, 
            Id_Role = :roles 
          WHERE Id_User = :id";

  $stmt=$pdo->prepare($sql);
  $stmt->bindParam(":last_name", $last_name);
  $stmt->bindParam(":first_name", $first_name);
  $stmt->bindParam(":email", $email);
  $stmt->bindParam(":birthDate", $birthDate);
  $stmt->bindParam(":pwd", $pwd);
  $stmt->bindParam(":activity", $activity);
  $stmt->bindParam(":roles", $role);
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
