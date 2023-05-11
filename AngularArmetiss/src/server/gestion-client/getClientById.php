<?php

include_once('../database.php');

if(isset($_GET['clientId'])){
    $clientId = $_GET['clientId'];
    $sql = "SELECT * FROM Client WHERE ID_Client = :clientId";
    $stmt=$pdo->prepare($sql);
    $stmt->bindParam(":clientId",$clientId,PDO::PARAM_INT);

    if($stmt->execute()){
        $client=$stmt->fetch(PDO::FETCH_ASSOC);
        if($client){
            echo json_encode(['data' => $client]);
        }else{
            http_response_code(404);
        }
    }else{
        http_response_code(404);
    }
}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}

?>
