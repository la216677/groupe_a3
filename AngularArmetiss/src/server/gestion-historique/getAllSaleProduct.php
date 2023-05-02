<?php

    include_once('../database.php');

    $saleId = $_GET['id'];

    $saleProduct = [];

    $sqlRequest = "SELECT * FROM Sale_Product WHERE Id_Sale=:idSale";
    $stmt = $pdo->prepare($sqlRequest);
    $stmt->execute(['idSale' => $saleId]);

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $productId = $row['Id_Product'];
        $quantity = $row['Quantity'];

        $sqlRequest2 = "SELECT * FROM Product WHERE Id_Product=:productId";
        $stmt2 = $pdo->prepare($sqlRequest2);
        $stmt2->execute(['productId' => $productId]);
        $productRow = $stmt2->fetch(PDO::FETCH_ASSOC);

        $saleProduct[] = [
            'Id_Product' => $productId,
            'Product_Name' => $productRow['Product_Name'],
            'Sale_Price' => $productRow['Product_Sale_Price_TVAC'],
            'Quantity' => $quantity
        ];
    }
    header('Content-Type: application/json');
    echo json_encode(['data'=>$saleProduct]);
?>