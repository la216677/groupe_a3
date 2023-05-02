<?php
include_once('../database.php');

if (isset($_GET['categoryId'])) {
    $categoryId = $_GET['categoryId'];

    try {

        // Prépare la requête
        $sql = "DELETE FROM Category  WHERE ID_Category = :categoryId";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam("categoryId", $categoryId);

        // Exécute la requête
        $result = $stmt->execute();

        if ($result) {
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
