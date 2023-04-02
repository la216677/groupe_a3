<?php 

include_once('../database.php');

$users = [];
$sql = "SELECT * FROM Users";

if($result = mysqli_query($mysqli,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $users[$i]['Id_User'] = $row['Id_User'];
    $users[$i]['User_Last_Name'] = $row['User_Last_Name'];
    $users[$i]['User_First_Name'] = $row['User_First_Name'];
    $users[$i]['User_Email_Address'] = $row['User_Email_Address'];
    $users[$i]['User_BirthDate'] = $row['User_BirthDate'];
    $users[$i]['User_Password'] = $row['User_Password'];
    $users[$i]['User_Activity'] = $row['User_Activity'];
    $users[$i]['Id_Role'] = $row['Id_Role'];

    $i++;
  }
    
  echo json_encode(['data'=>$users]);
}
else
{
  http_response_code(404);
}

?>