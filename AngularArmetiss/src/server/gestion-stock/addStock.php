<?php

include_once('../database.php');

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    $request = json_decode($postdata);

    $quantity = trim($request->Stock_Quantity);
    $price = trim($request->Stock_Purchase_Price_HTVA);
    $purchaseDate = trim($request->Stock_Date);
    $provider = trim($request->Stock_Provider);

    $sql = "INSERT INTO Stock(Stock_Quantity, >Stock_Purchase_Price_HTVA, Stock_Date, Stock_Provider)
    VALUES ('$quantity', '$price', '$email', '$purchaseDate', '$provider')";

    if($mysqli->query($sql)){
        $data = array('message' => 'success');
        echo json_encode($data);
    } else{
        $data = array('message' => 'failed');
        echo json_encode($data);
    }
}
?>