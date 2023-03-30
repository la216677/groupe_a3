<?php 

include_once('../database.php');

$roles = [];
$sql = "SELECT * FROM Role";

if($result = mysqli_query($mysqli,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $roles[$i]['ID_Role']    = $row['ID_Role'];
    $roles[$i]['Role'] = $row['Role'];
    $i++;
  }
    
  echo json_encode(['data'=>$roles]);
}
else
{
  http_response_code(404);
}

?>