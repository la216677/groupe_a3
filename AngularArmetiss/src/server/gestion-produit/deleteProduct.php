<?php
include_once('../database.php');

if (isset($_GET['productId'])) {
    $productId = $_GET['productId'];

    try {

        // Prépare la requête
        $sql = "DELETE FROM Product WHERE ID_Product = :productId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":productId", $productId);

        if ($stmt->execute()) {
            $data = array('message' => 'success');
            echo json_encode($data);
        } else {
            $data = array('message' => 'failed');
            echo json_encode($data);
        }

    } catch (Exception $e) {
        // Gère les exceptions
        $data = array('message' => 'error', 'error' => $e->getMessage());
        echo json_encode($data);
    }
}
?>
