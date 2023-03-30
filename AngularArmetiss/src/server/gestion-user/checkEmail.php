<?php
include_once('../database.php');


// Vérification si l'email existe déjà dans la table des utilisateurs
$email = $_GET['email'];
$sql = "SELECT COUNT(*) AS count FROM Users WHERE User_Email_Address='$email'";
$result = $mysqli->query($sql);

if ($result === false) {
  // Erreur lors de l'exécution de la requête
  echo json_encode(false);
} else {
  $row = $result->fetch_assoc();
  $count = $row["count"];
  if ($count > 0) {
    // L'email existe déjà
    echo json_encode(true);
  } else {
    // L'email n'existe pas
    echo json_encode(false);
  }
}

$mysqli->close();