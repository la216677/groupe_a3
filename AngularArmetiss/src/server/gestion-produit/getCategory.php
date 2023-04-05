<?php 

include_once('../database.php');

$category = [];
$sql = "SELECT * FROM Category WHERE Category_Visibility = true";

if($result = mysqli_query($mysqli,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $category[$i]['ID_Category'] = $row['ID_Category'];
    $category[$i]['Category_Name'] = $row['Category_Name'];
    $category[$i]['Category_Description'] = $row['Category_Description'];
    $category[$i]['Category_Image_URL'] = $row['Category_Image_URL'];
    $category[$i]['Category_Visibility'] = $row['Category_Visibility'];
    $i++;
  }
    
  echo json_encode(['data'=>$category]);
}
else
{
  http_response_code(404);
}

?>