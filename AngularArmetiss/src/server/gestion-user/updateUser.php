<?php
include_once('../database.php');

// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){
  //extraire les données
  $request = json_decode($postdata);

  $id = mysqli_real_escape_string($mysqli, trim($request->Id_User));
  $last_name = mysqli_real_escape_string($mysqli, trim($request->User_Last_Name));
  $first_name = mysqli_real_escape_string($mysqli, trim($request->User_First_Name));
  $pwd = mysqli_real_escape_string($mysqli, trim($request->User_Password));
  $email = mysqli_real_escape_string($mysqli, trim($request->User_Email_Address));
  $birthDate = mysqli_real_escape_string($mysqli, trim($request->User_BirthDate));
  $activity = mysqli_real_escape_string($mysqli, trim($request->User_Activity));
  $role = mysqli_real_escape_string($mysqli, trim($request->Id_Role));

  $sql = "UPDATE Users SET 
            User_Last_Name = '$last_name', 
            User_First_Name = '$first_name', 
            User_Email_Address = '$email', 
            User_BirthDate = '$birthDate', 
            User_Password = '$pwd', 
            User_Activity = '$activity', 
            Id_Role = '$role' 
          WHERE Id_User = $id";

  if($mysqli->query($sql)){
    $data = array('message' => 'success');
    echo json_encode($data);
  } else{
    $data = array('message' => 'failed');
    echo json_encode($data);
  }
}
?>
