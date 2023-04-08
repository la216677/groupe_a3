<?php 

include_once('../database.php');

if(isset($_GET['categoryId'])){
    $categoryId = mysqli_real_escape_string($mysqli, $_GET['categoryId']);
    $sql = "SELECT * FROM Category WHERE ID_Category = '$categoryId'";
    $result = mysqli_query($mysqli, $sql);
    
    if($result){
        $category = mysqli_fetch_assoc($result);
        echo json_encode(['data'=>$category]);
    }
    else{
        http_response_code(404);
    }
}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}

?>
