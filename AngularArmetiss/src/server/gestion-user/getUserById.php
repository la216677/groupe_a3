<?php 

include_once('../database.php');

if(isset($_GET['userId'])){
    $userId = $_GET['userId'];
    $sql = "SELECT * FROM Users WHERE Id_User = :userId";
    $stmt=$pdo->prepare($sql);
    $stmt->bindParam(":userId",$userId,PDO::PARAM_INT);

    if($stmt->execute()){
        $user=$stmt->fetch(PDO::FETCH_ASSOC);
        if($user){
            echo json_encode(['data' => $user]);
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
