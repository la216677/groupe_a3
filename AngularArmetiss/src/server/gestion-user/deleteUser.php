<?php 

include_once('../database.php');

if(isset($_GET['userId'])){
    $userId = mysqli_real_escape_string($mysqli, $_GET['userId']);
    $sql = "DELETE FROM Users WHERE Id_User = '$userId'";
    $result = mysqli_query($mysqli, $sql);
    
    if($result){
        http_response_code(204); //no content (requête réussie, mais pas de contenu à renvoyer)
    }
    else{
        http_response_code(404);
    }
}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}


?>