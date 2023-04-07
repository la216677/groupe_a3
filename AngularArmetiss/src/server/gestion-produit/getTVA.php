<?php 

include_once('../database.php');

$tva = [];
$sql = "SELECT * FROM TVA";

if($result = mysqli_query($mysqli,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $tva[$i]['ID_TVA'] = $row['ID_TVA'];
    $tva[$i]['TVA_Rate'] = $row['TVA_Rate'];
    $tva[$i]['TVA_Rate_Name'] = $row['TVA_Rate_Name'];

    $i++;
  }
    
  echo json_encode(['data'=>$tva]);
}
else
{
  http_response_code(404);
}

?>