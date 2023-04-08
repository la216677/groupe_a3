<?php
include_once('../database.php');

if (isset($_GET['productId'])) {
    $productId = $_GET['productId'];

    try {

        // Prépare la requête
        $sql = "DELETE FROM Product WHERE ID_Product = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("i", $productId);

        // Exécute la requête
        $result = $stmt->execute();

        if ($result) {
            $data = array('message' => 'success');
            echo json_encode($data);
        } else {
            $data = array('message' => 'failed');
            echo json_encode($data);
        }

        // Ferme la connexion à la base de données
        $mysqli->close();

    } catch (Exception $e) {
        // Gère les exceptions
        $data = array('message' => 'error', 'error' => $e->getMessage());
        echo json_encode($data);
    }
}
?>
