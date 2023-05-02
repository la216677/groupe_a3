<?php 

    include_once('../database.php');

    if(isset($_GET['productId'])){
        $productId = htmlspecialchars($_GET['productId']);
        $sql = "SELECT * FROM Product WHERE Id_Product = :productId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':productId', $productId);
        $stmt->execute();

        $product = $stmt->fetch(PDO::FETCH_ASSOC);
        if($product){
            echo json_encode(['data'=>$product]);
        }else{
            http_response_code(404);
        }
    }
    else{
        http_response_code(400); //bad request (quelque chose c'est mal passer)
    }

?>