<?php
include_once('../database.php');

if (isset($_GET['categoryId'])) {
    $categoryId = $_GET['categoryId'];

    try {

        // Prépare la requête
        $sql = "UPDATE Category SET Category_Visibility = false WHERE ID_Category = ?";
        $stmt = $mysqli->prepare($sql);
        $stmt->bind_param("i", $categoryId);

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
