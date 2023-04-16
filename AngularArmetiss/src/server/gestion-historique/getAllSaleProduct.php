<?php

    include_once('../database.php');

    $saleId=$_GET['id'];

    $saleProduct=[];

    $sql="SELECT * FROM Sale_Product WHERE Id_Sale='$saleId'";

    if($result = mysqli_query($mysqli,$sql))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $saleProduct[$i]['Id_Product'] = $row['Id_Product'];
            $productId= $row['Id_Product'];
            $saleProduct[$i]['Quantity'] = $row['Quantity'];

            $sql2="SELECT * FROM Product WHERE Id_Product='$productId'";
            if($result2=mysqli_query($mysqli,$sql2)){
                while($row = mysqli_fetch_assoc($result2)){
                    $saleProduct[$i]['Product_Name'] = $row['Product_Name'];
                    $saleProduct[$i]['Sale_Price'] = $row['Product_Sale_Price_TVAC'];
                }
            }
            $i++;
        }
        header('Content-Type: application/json');
        echo json_encode(['data'=>$saleProduct]);
    }
    else
    {
        http_response_code(404);
    }

?>