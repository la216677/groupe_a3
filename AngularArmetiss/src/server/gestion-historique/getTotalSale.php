<?php

    include_once('../database.php');

    $saleId = $_GET['id'];

    $totalCommande = 0;

    $sqlRequest = "SELECT Sale_Price FROM Sale WHERE Id_Sale=:idSale";
    $stmt = $pdo->prepare($sqlRequest);
    $stmt->execute(['idSale' => $saleId]);

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $totalCommande = $row['Sale_Price'];
    }
    header('Content-Type: application/json');
    echo json_encode(['data'=>$totalCommande]);
?>
