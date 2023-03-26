<?php
include_once('../database.php');

// recevoir les données posté
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

  //extraire données
  $request = json_decode($postdata);

  $last_name = trim($request->last_name);
  $first_name = trim($request->first_name);
  $pwd = mysqli_real_escape_string($mysqli, trim($request->pwd));
  $email = mysqli_real_escape_string($mysqli, trim($request->email));
  $birthDate = trim($request->birthDate);
  $activity = trim($request->activity);
  $role = trim($request->role);

  $sql = "INSERT INTO Users(User_Last_Name, User_First_Name, User_Email_Address, User_BirthDate, User_Password, User_Activity, Id_Role)
  VALUES ('$last_name', '$first_name', '$email', '$birthDate', '$pwd', '$activity', '$role')";



if($mysqli->query($sql)){
  $data = array('message' => 'success');
  echo json_encode($data);
}else{
  $data = array('message' => 'failed');
  echo json_encode($data);

}
}
/*
if ($mysqli->query($sql) === TRUE) {
  $authdata = [
  'last_name' => $last_name,
  'first_name' => $first_name,
  'pwd' => '',
  'email' => $email,
  'birthDate' => $birthDate,
  'role' => $role,
  'Id' => mysqli_insert_id($mysqli)
  ];
  echo json_encode($authdata);
  }
*/

?>
