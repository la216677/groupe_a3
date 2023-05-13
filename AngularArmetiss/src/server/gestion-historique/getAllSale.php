<?php

include_once('../database.php');

$idClient = null;
$idUser = null;
$i = 0;

$sale = [];
$sqlRequest1 = "SELECT * FROM Sale";

$stmt1 = $pdo->prepare($sqlRequest1);
$stmt1->execute();

while ($row = $stmt1->fetch(PDO::FETCH_ASSOC)) {
  // $row['Client_Name'] = "franco";

  $sale[$i] = $row;

  $idClient = $sale[$i]['Id_Client'];
  $idUser = $sale[$i]['Id_User'];
  if ($idClient != null) {
    $sqlRequest2 = "SELECT Client_Name,Client_Last_Name FROM Client WHERE ID_Client=:idClient";

    $stmt2 = $pdo->prepare($sqlRequest2);
    $stmt2->bindParam(':idClient', $idClient);

    if ($stmt2->execute()) {
      $client = $stmt2->fetch(PDO::FETCH_ASSOC);
      $row['Client_Name'] = $client['Client_Name'];
      $row['Client_Last_Name'] = $client['Client_Last_Name'];
    }
  }


  $sqlRequest3 = "SELECT User_Last_Name,User_First_Name FROM Users WHERE Id_User=:idUser";

  $stmt3 = $pdo->prepare($sqlRequest3);
  $stmt3->bindParam(':idUser', $idUser);

  if ($stmt3->execute()) {
    $user = $stmt3->fetch(PDO::FETCH_ASSOC);
    $row['User_Last_Name'] = $user['User_Last_Name'];
    $row['User_First_Name'] = $user['User_First_Name'];
  }

  $sale[$i] = $row;
  $i++;
}

echo json_encode(['data' => $sale]);
