<?php

include_once('../database.php');
$sale = [];
$idClient = null;
if (isset($_GET['id'])) {
  $userId = $_GET['id'];

  $sqlRequest = "SELECT s.*, c.Client_Name, c.Client_Last_Name, c.Client_Delete, c.Client_Email, u.User_Last_Name, u.User_First_Name, u.User_Delete, u.User_Email_Address
  FROM Sale s
  LEFT JOIN Client c ON s.Id_Client = c.ID_Client
  LEFT JOIN Users u ON s.Id_User = u.Id_User
  WHERE s.Id_User = :idUser
  ORDER BY s.Sale_Date DESC;";

  $stmt = $pdo->prepare($sqlRequest);
  $stmt->bindParam(':idUser', $userId);
  if ($stmt->execute()) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      if ($row['Client_Delete'] == 1 || $row['User_Delete'] == 1)
        continue;
      else
        $sale[] = $row;
    }
    echo json_encode(['data' => $sale]);
  } else {
    echo json_encode(['message' => 'No sale found']);
    http_response_code(200);
  }
} else {
  http_response_code(400); //bad request (quelque chose c'est mal passer)
}
