<?php 

include_once('../database.php');

if(isset($_GET['productId'])){
    $productId = mysqli_real_escape_string($mysqli, $_GET['productId']);
    $sql = "SELECT * FROM Product WHERE Id_Product = '$productId'";
    $result = mysqli_query($mysqli, $sql);
    
    if($result){
        $product = mysqli_fetch_assoc($result);
        echo json_encode(['data'=>$product]);
    }
    else{
        http_response_code(404);
    }
}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}

?>
