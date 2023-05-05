<?php

    include_once('../database.php');

    $json_data = file_get_contents('php://input');
    $dataReceived = json_decode($json_data,true);
    $userId = isset($dataReceived['user']) ? trim($dataReceived['user']) : null;; //Id de l'user a récuperer une fois que la connexion sera effectué

    $sale=[];
    $sqlRequest = "SELECT * FROM Sale WHERE Id_User=:idUser";

    $stmt = $pdo->prepare($sqlRequest);
    $stmt->bindParam(':idUser',$userId);
    $stmt->execute();
    
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $sale[] = $row;
    }

    echo json_encode(['data'=>$sale]);
?>