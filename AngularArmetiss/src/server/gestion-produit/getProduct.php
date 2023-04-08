<?php 

include_once('../database.php');

$product = [];
$sql = "SELECT * FROM Product";

if($result = mysqli_query($mysqli,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $product[$i]['Id_Product'] = $row['Id_Product'];
    $product[$i]['Product_Name'] = $row['Product_Name'];
    $product[$i]['Product_Sale_Price_HTVA'] = $row['Product_Sale_Price_HTVA'];
    $product[$i]['Product_Sale_Price_TVAC'] = $row['Product_Sale_Price_TVAC'];
    $product[$i]['Product_Description'] = $row['Product_Description'];
    $product[$i]['Product_Quantity'] = $row['Product_Quantity'];
    $product[$i]['Product_Image_URL'] = $row['Product_Image_URL'];
    $product[$i]['Product_Visibility'] = $row['Product_Visibility'];
    $product[$i]['Id_TVA'] = $row['Id_TVA'];
    $product[$i]['Id_Category'] = $row['Id_Category'];

    $i++;
  }
    
  echo json_encode(['data'=>$product]);
}
else
{
  http_response_code(404);
}

?>