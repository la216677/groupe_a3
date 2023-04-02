<?php
include_once('../database.php');


// recevoir les données postées
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

  //extraire les données
  $request = json_decode($postdata);

  $last_name = trim($request->User_Last_Name);
  $first_name = trim($request->User_First_Name);
  $pwd = mysqli_real_escape_string($mysqli, trim($request->User_Password));
  $email = mysqli_real_escape_string($mysqli, trim($request->User_Email_Address));
  $birthDate = trim($request->User_BirthDate);
  $activity = trim($request->User_Activity);
  $role = trim($request->Id_Role);

  $sql = "INSERT INTO Users(User_Last_Name, User_First_Name, User_Email_Address, User_BirthDate, User_Password, User_Activity, Id_Role)
  VALUES ('$last_name', '$first_name', '$email', '$birthDate', '$pwd', '$activity', '$role')";

  if($mysqli->query($sql)){
    $data = array('message' => 'success');
    echo json_encode($data);
  } else{
    $data = array('message' => 'failed');
    echo json_encode($data);
  }
}
?>
