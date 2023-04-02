<?php 

include_once('../database.php');

if(isset($_GET['userId'])){
    $userId = mysqli_real_escape_string($mysqli, $_GET['userId']);
    $sql = "SELECT * FROM Users WHERE Id_User = '$userId'";
    $result = mysqli_query($mysqli, $sql);
    
    if($result){
        $user = mysqli_fetch_assoc($result);
        echo json_encode(['data'=>$user]);
    }
    else{
        http_response_code(404);
    }
}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}

?>
