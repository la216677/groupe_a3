<?php

    include_once('../database.php');

    $idProduct = $_GET['id'];

    $history = [];

    $sqlRequest = "SELECT * FROM Stock WHERE Id_Product=:idProduct";
    $stmt = $pdo->prepare($sqlRequest);
    $stmt->execute(['idProduct' => $idProduct]);

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $Id_Stock = $row['Id_Stock'];
        $Stock_Quantity = $row['Stock_Quantity'];
        $Stock_Date = $row['Stock_Date'];
        $Stock_Purchase_Price_HTVA = $row['Stock_Purchase_Price_HTVA'];
        $Stock_Purchase_Price_TVAC = $row['Stock_Purchase_Price_TVAC'];
        $Stock_provider = $row['Stock_provider'];


        $history[] = [
            'Id_Stock' => $row['Id_Stock'],
            'Stock_Quantity' => $row['Stock_Quantity'],
            'Stock_Date' => $row['Stock_Date'],
            'Stock_Purchase_Price_HTVA' => $row['Stock_Purchase_Price_HTVA'],
            'Stock_Purchase_Price_TVAC' => $row['Stock_Purchase_Price_TVAC'],
            'Id_Product' => $idProduct,
            'Stock_provider' => $row['Stock_provider']
        ];
    }
    header('Content-Type: application/json');
    echo json_encode(['data'=>$history]);
?>
