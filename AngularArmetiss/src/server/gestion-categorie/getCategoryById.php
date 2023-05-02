<?php 

include_once('../database.php');

if(isset($_GET['categoryId'])){
    $categoryId = $_GET['categoryId'];

    $stmt = $pdo->prepare("SELECT * FROM Category WHERE ID_Category = :categoryId");
    $stmt->bindParam(':categoryId', $categoryId, PDO::PARAM_INT);

    $stmt->execute();

    $category = $stmt->fetch(PDO::FETCH_ASSOC);

    if($category){
        echo json_encode(['data' => $category]);
    }else{
        http_response_code(404);
    }
}
else{
    http_response_code(400); //bad request (quelque chose c'est mal passer)
}

?>
