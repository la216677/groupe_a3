<?php
include_once('../database.php');

  // if(isset($_POST['']))
  // $sql = "UPDATE Societe SET name :name address = :adresse, city = :city, postal_code = :postalCode,country = :country, phone_number = :phone, email = :email, Website = :website, vat_number = :tva";

// Récupérer les données envoyées depuis Angular
$data = json_decode(file_get_contents("php://input"),true);

// Vérifier si les données ont été correctement reçues
if (!$data) {
    $response = array('status' => 'error', 'message' => 'Aucune donnée reçue.');
    echo json_encode($response);
    exit;
}

// Accéder aux propriétés de l'objet Society reçu depuis Angular
$societyName = $data[0]['name'];
$societyAdress = $data[0]['address'];
$societyCity = $data[0]['city'];
$societyPostalCode = $data[0]['postal_code'];
$societyCountry = $data[0]['country'];
$societyPhone = $data[0]['phone_number'];
$societyEmail = $data[0]['email'];
$societyWebsite = $data[0]['website'];
$societyVatNumber = $data[0]['vat_number'];

// Vérifier si les données ne sont pas vides
if (empty($societyName) || empty($societyAdress) || empty($societyCity) || empty($societyPostalCode) || empty($societyCountry) || empty($societyPhone) || empty($societyEmail) || empty($societyWebsite) || empty($societyVatNumber)) {
    $response = array('status' => 'error', 'message' => 'Veuillez remplir tous les champs.');
    echo json_encode($response);
    exit;
}


$sql = "UPDATE Society_Info SET name = :name, address = :adresse, city = :city, postal_code = :postalCode,country = :country, phone_number = :phone, email = :email, Website = :website, vat_number = :tva";


// Exécuter la requête SQL
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name', $societyName);
$stmt->bindValue(':adresse', $societyAdress);
$stmt->bindValue(':city', $societyCity);
$stmt->bindValue(':postalCode', $societyPostalCode);
$stmt->bindValue(':country', $societyCountry);
$stmt->bindValue(':phone', $societyPhone);
$stmt->bindValue(':email', $societyEmail);
$stmt->bindValue(':website', $societyWebsite);
$stmt->bindValue(':tva', $societyVatNumber);

if($stmt->execute()) {
    $response = array('status' => 'success', 'message' => 'Les informations de la société ont été mises à jour.');
} else {
    $response = array('status' => 'error', 'message' => 'Une erreur est survenue lors de la mise à jour des informations de la société.');
}

echo json_encode($response);
?>

?>
