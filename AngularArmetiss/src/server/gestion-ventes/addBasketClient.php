<?php

    include_once('../database.php');

    $json_data = file_get_contents('php://input');

    $dataReceived = json_decode($json_data,true);

    $sale_price=trim($dataReceived['totalPrice']);
    $baskets = $dataReceived['basket'];
    $userId = 1; //Id de l'user a récuperer une fois que la connexion sera effectué

    $sql="INSERT INTO Sale(Sale_Price,Sale_Date,Id_User) 
    VALUES ('$sale_price',CURDATE(),'$userId')";

    if($mysqli->query($sql)){
        $data = array('message' => 'success');
        
    } else{
        $data = array('message' => 'failed');
    }

    $last_id=mysqli_insert_id($mysqli);

    foreach ($baskets as $basketItem) {
        $product = $basketItem[0];
        $quantity = $basketItem[1];
      
        $productId = $product['Id_Product'];
        
        $sqlSale="INSERT INTO Sale_Product(Id_Product,Id_Sale,Quantity) VALUES ('$productId','$last_id','$quantity')";

        if($mysqli->query($sqlSale)){
            $data = array('message' => 'success');
    
        } else{
            $data = array('message' => 'failed');
            echo "Error: " . mysqli_error($mysqli);
        }
    }

    $response = $last_id;
    echo json_encode($response);
?>