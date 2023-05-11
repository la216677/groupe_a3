<?php

include_once('../database.php');

if(isset($_GET['clientId'])){
    $clientId = $_GET['clientId'];

    try{
        $sql = "DELETE FROM Client WHERE ID_Client = :clientId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":clientId",$clientId,PDO::PARAM_INT);

        $result=$stmt->execute();

        if($result){
            http_response_code(204); //no content (requête réussie, mais pas de contenu à renvoyer)
        }else{
            http_response_code(404);
        }
    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(array('message' => 'error', 'error' => $e->getMessage()));
    }

}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}


?>
