<?php

    include_once('../database.php');

    $sale=[];
    $sqlRequest = "SELECT * FROM Sale";

    $stmt = $pdo->prepare($sqlRequest);
    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $sale[] = $row;
    }

    echo json_encode(['data'=>$sale]);
?>