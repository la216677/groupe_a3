<?php

include_once('../database.php');

if(isset($_GET['userId'])){
    $userId = $_GET['userId'];

    try{
        $sql = "UPDATE Users SET User_Delete = TRUE WHERE Id_User = :userId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":userId",$userId,PDO::PARAM_INT);

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
